import { Injectable, NotFoundException } from '@nestjs/common';
import { PDFDocument, rgb, StandardFonts, PDFFont, degrees, PDFImage } from 'pdf-lib';
import axios from 'axios';
import * as path from 'path';
import * as fs from 'fs';
import * as QRCode from 'qrcode';
import fontkit from '@pdf-lib/fontkit';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCertificadoDto } from './dto/create-certificado.dto';
import { UpdateCertificadoDto } from './dto/update-certificado.dto';

@Injectable()
export class CertificadosService {
  private fontCache = new Map<string, Buffer>();
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateCertificadoDto) {
    return this.prisma.certificado.create({
      data: createDto as any,
    });
  }

  async issueCertificate(usuarioIdRaw: any, cursoIdRaw: any) {
    const usuario_id = Number(usuarioIdRaw);
    const curso_id = Number(cursoIdRaw);
    
    console.log(`[issueCertificate] usuario_id: ${usuario_id}, curso_id: ${curso_id}`);
    // Verificar si el curso tiene una plantilla configurada
    const curso = await this.prisma.curso.findUnique({
      where: { id: curso_id },
      include: { plantilla_certificado: true }
    });

    if (!curso) {
      console.warn(`[issueCertificate] Curso ${curso_id} no encontrado.`);
      return null;
    }

    if (!curso.plantilla_certificado) {
      console.warn(`[issueCertificate] El curso ${curso_id} (${curso.titulo}) no tiene plantilla de certificado. No se puede emitir.`);
      return null;
    }

    console.log(`[issueCertificate] Plantilla encontrada: ${curso.plantilla_certificado.nombre}`);

    // Verificar si ya existe un certificado para este usuario y curso
    const existing = await this.prisma.certificado.findFirst({
      where: { usuario_id, curso_id }
    });
    
    if (existing) return existing;

    // Generar un código único simple
    const codigo = `EV-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;

    return this.prisma.certificado.create({
      data: {
        usuario_id,
        curso_id,
        codigo_certificado: codigo,
        pdf_url: '', // Se genera dinámicamente mediante el endpoint
        fecha_emision: new Date(),
      }
    });
  }

  async findAll() {
    return this.prisma.certificado.findMany({
      include: { curso: true }
    });
  }

  async findByUserId(userId: number) {
    return this.prisma.certificado.findMany({
      where: { usuario_id: userId },
      include: { curso: true }
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.certificado.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Registro no encontrado');
    return record;
  }

  async update(id: number, updateDto: UpdateCertificadoDto) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.certificado.update({
      where: { id },
      data: updateDto as any,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.certificado.delete({
      where: { id },
    });
  }

  async generatePdf(id: number): Promise<Buffer> {
    const certificado = await this.prisma.certificado.findUnique({
      where: { id },
      include: {
        usuario: true,
        curso: {
          include: {
            plantilla_certificado: true,
            instructor: true,
            categoria: true,
          },
        },
      },
    });

    if (!certificado) throw new NotFoundException('Certificado no encontrado');
    const plantilla = certificado.curso.plantilla_certificado;
    if (!plantilla) throw new NotFoundException('Este curso no tiene una plantilla de certificado configurada');

    const instructorName = certificado.curso.instructor ? `${certificado.curso.instructor.nombres} ${certificado.curso.instructor.apellidos}`.toUpperCase() : 'N/A';
    
    const placeholders = {
      '{{estudiante}}': `${certificado.usuario.nombres} ${certificado.usuario.apellidos}`.toUpperCase(),
      '{{curso}}': certificado.curso.titulo.toUpperCase(),
      '{{categoria}}': certificado.curso.categoria?.nombre.toUpperCase() || '',
      '{{nivel}}': certificado.curso.nivel?.toUpperCase() || '',
      '{{tipo_curso}}': certificado.curso.tipo_curso?.toUpperCase() || '',
      '{{fecha}}': new Date(certificado.fecha_emision).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
      '{{codigo}}': certificado.codigo_certificado,
      '{{ci}}': certificado.usuario.ci || '',
      '{{telefono}}': certificado.usuario.telefono || '',
      '{{instructor}}': instructorName,
      '{{foto}}': certificado.usuario.imagen_perfil,
    };

    return this.renderCertificate(plantilla, placeholders);
  }

  async generatePreview(plantillaId: number): Promise<Buffer> {
    try {
      console.log(`[generatePreview] Iniciando preview para plantilla: ${plantillaId}`);
      const plantilla = await this.prisma.certificadoPlantilla.findUnique({
        where: { id: plantillaId },
        include: { curso: { include: { instructor: true, categoria: true } } }
      });

      if (!plantilla) {
        console.error(`[generatePreview] Plantilla ${plantillaId} no encontrada`);
        throw new NotFoundException('Plantilla no encontrada');
      }

      const instructorName = plantilla.curso?.instructor 
        ? `${plantilla.curso.instructor.nombres} ${plantilla.curso.instructor.apellidos}`.toUpperCase() 
        : 'INSTRUCTOR DE PRUEBA';
      
      const placeholders = {
        '{{estudiante}}': 'JUAN PÉREZ GARCÍA',
        '{{curso}}': (plantilla.curso?.titulo || 'CURSO DE PRUEBA').toUpperCase(),
        '{{categoria}}': plantilla.curso?.categoria?.nombre.toUpperCase() || 'TECNOLOGÍA',
        '{{nivel}}': plantilla.curso?.nivel?.toUpperCase() || 'AVANZADO',
        '{{tipo_curso}}': plantilla.curso?.tipo_curso?.toUpperCase() || 'VIRTUAL',
        '{{fecha}}': new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
        '{{codigo}}': 'EV-000-PREVIEW',
        '{{ci}}': '12345678',
        '{{telefono}}': '77712345',
        '{{instructor}}': instructorName,
        '{{foto}}': null,
      };

      console.log(`[generatePreview] Renderizando certificado...`);
      const buffer = await this.renderCertificate(plantilla, placeholders);
      console.log(`[generatePreview] PDF generado exitosamente (${buffer.length} bytes)`);
      return buffer;
    } catch (error) {
      console.error(`[generatePreview] ERROR CRÍTICO AL GENERAR PREVIEW:`, error);
      if (error.stack) console.error(error.stack);
      throw error;
    }
  }

  private async renderCertificate(plantilla: any, placeholders: any): Promise<Buffer> {
    console.log(`[renderCertificate] Iniciando renderizado para plantilla: ${plantilla.id}`);
    let config: any = plantilla.config;
    if (typeof config === 'string') {
      try {
        config = JSON.parse(config);
      } catch (e) {
        console.error('[renderCertificate] Error parsing config string:', e);
        config = {};
      }
    }
    config = config || {};
    const elements = config.elements || [];
    
    // Configuración de página
    const formatKey = config.selectedFormat || 'A4';
    const orientation = config.orientation || 'landscape';
    const pageFormats: any = {
      'A4': [595.28, 841.89],
      'Letter': [612, 792],
      'Legal': [612, 1008],
      'Oficio': [612, 936], // 8.5 x 13 inches
      'Custom': [config.logicalHeight || 707, config.logicalWidth || 1000],
    };

    const baseFormat = pageFormats[formatKey] || pageFormats['A4'];
    const pageWidth = orientation === 'landscape' ? Math.max(baseFormat[0], baseFormat[1]) : Math.min(baseFormat[0], baseFormat[1]);
    const pageHeight = orientation === 'landscape' ? Math.min(baseFormat[0], baseFormat[1]) : Math.max(baseFormat[0], baseFormat[1]);

    console.log(`[renderCertificate] Formato: ${formatKey}, Orientación: ${orientation}, Tamaño PDF: ${pageWidth.toFixed(2)}x${pageHeight.toFixed(2)}`);

    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    
    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    let backgroundImage: PDFImage | null = null;
    if (plantilla.background_url && plantilla.background_url.trim() !== '') {
      try {
        console.log(`[renderCertificate] Cargando fondo: ${plantilla.background_url}`);
        const backgroundBuffer = await this.getFileBuffer(plantilla.background_url);
        
        try {
          backgroundImage = await pdfDoc.embedJpg(backgroundBuffer);
        } catch (e) {
          backgroundImage = await pdfDoc.embedPng(backgroundBuffer);
        }
        
        if (backgroundImage) {
          page.drawImage(backgroundImage, {
            x: 0,
            y: 0,
            width: pageWidth,
            height: pageHeight,
          });
        }
      } catch (error) {
        console.error(`[renderCertificate] Error cargando imagen de fondo: ${plantilla.background_url}`, error.message);
      }
    } else {
        console.warn(`[renderCertificate] No se pudo cargar la imagen de fondo, se usará página en blanco`);
    }

    // El editor frontend usa un ancho lógico (por defecto 1000px).
    const logicalWidth = config.logicalWidth || 1000;
    const scaleFactor = pageWidth / logicalWidth;

    if (Array.isArray(elements)) {
      for (const element of elements) {
        try {
          if (element.type === 'text') {
            await this.drawElementText(pdfDoc, page, element, placeholders, pageHeight, scaleFactor);
          } else if (element.type === 'image') {
            await this.drawElementImage(pdfDoc, page, element, placeholders, pageHeight, scaleFactor);
          } else if (element.type === 'qr') {
            await this.drawElementQR(pdfDoc, page, element, placeholders['{{codigo}}'] || 'VALIDATION', pageHeight, scaleFactor);
          }
        } catch (elError) {
          console.error(`[renderCertificate] Error renderizando elemento ${element.type}:`, elError.message);
        }
      }
    } else {
      console.warn(`[renderCertificate] elements no es un array:`, elements);
    }

    try {
      const pdfBytes = await pdfDoc.save();
      return Buffer.from(pdfBytes);
    } catch (saveError) {
      console.error(`[renderCertificate] Error al salvar PDF:`, saveError.message);
      throw saveError;
    }
  }

  private async getFileBuffer(url: string): Promise<Buffer> {
    try {
      if (url.startsWith('http')) {
        const response = await axios.get(url, { 
          responseType: 'arraybuffer',
          timeout: 15000, // 15 segundos timeout
          headers: { 'Accept': 'image/*, font/*' }
        });
        return Buffer.from(response.data);
      } else {
        const publicPath = path.join(process.cwd(), 'public');
        // Limpiar URL de posibles prefijos duplicados
        const cleanUrl = url.startsWith('/public') ? url.replace('/public', '') : url;
        const fullPath = path.join(publicPath, cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`);
        
        if (!fs.existsSync(fullPath)) {
          console.warn(`[getFileBuffer] Archivo local no encontrado: ${fullPath}`);
          throw new Error(`Archivo no encontrado: ${url}`);
        }
        return fs.readFileSync(fullPath);
      }
    } catch (error) {
      console.error(`[getFileBuffer] Error cargando recurso (${url}):`, error.message);
      throw error;
    }
  }

  private async drawElementText(pdfDoc: PDFDocument, page: any, element: any, placeholders: any, pageHeight: number, scaleFactor: number) {
    let content = element.content || '';
    Object.keys(placeholders).forEach(key => {
      content = content.replace(new RegExp(key, 'g'), placeholders[key] || '');
    });

    const font = await this.loadFont(pdfDoc, element.fontFamily, element.bold, element.italic);
    const rgbColor = this.hexToRgb(element.color || '#000000');
    const rotate = degrees(-(Number(element.rotate) || 0));
    const opacity = Number(element.opacity) !== undefined ? Number(element.opacity) / 100 : 1;
    
    const fontSize = Math.max(1, (Number(element.size) || 12)) * scaleFactor;
    const maxWidth = Math.max(1, (Number(element.width) || 500)) * scaleFactor;
    const x = (Number(element.x) || 0) * scaleFactor;
    const y = (Number(element.y) || 0) * scaleFactor;
    
    if (isNaN(fontSize) || isNaN(maxWidth) || isNaN(x) || isNaN(y)) {
      console.warn(`[drawElementText] Valores invalidos detectados:`, { fontSize, maxWidth, x, y });
      return;
    }

    // Soporte para múltiples líneas y wrapping
    const paragraphs = content.split('\n');
    let lines: string[] = [];
    
    for (const paragraph of paragraphs) {
      const words = paragraph.split(' ');
      let currentLine = '';
      
      for (const word of words) {
        let testLine = currentLine ? `${currentLine} ${word}` : word;
        let testWidth = font.widthOfTextAtSize(testLine, fontSize);
        
        if (testWidth > maxWidth) {
          // Si la palabra sola es más ancha que el máximo, hay que partirla o forzarla
          if (!currentLine) {
            // Palabra sola es demasiado larga, la ponemos sola y que desborde un poco o se corte
            lines.push(word);
            currentLine = '';
          } else {
            // Empujamos la línea actual y empezamos una nueva con la palabra
            lines.push(currentLine);
            currentLine = word;
            
            // Verificar si la palabra sola desborda
            if (font.widthOfTextAtSize(currentLine, fontSize) > maxWidth) {
               // Podríamos partirla, pero por ahora la dejamos fluir
            }
          }
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) lines.push(currentLine);
    }

    const lineHeight = fontSize * 1.2;

    for (let i = 0; i < lines.length; i++) {
      const lineText = lines[i];
      const textWidth = font.widthOfTextAtSize(lineText, fontSize);
      
      let drawX = x;
      if (element.textAlign === 'center') {
        drawX = x + (maxWidth / 2) - (textWidth / 2);
      } else if (element.textAlign === 'right') {
        drawX = x + maxWidth - textWidth;
      }

      page.drawText(lineText, {
        x: drawX,
        y: pageHeight - y - (lineHeight * (i + 1)) + (fontSize * 0.25),
        size: fontSize,
        font,
        color: rgb(rgbColor.r, rgbColor.g, rgbColor.b),
        rotate,
        opacity,
      });
    }
  }

  private async drawElementImage(pdfDoc: PDFDocument, page: any, element: any, placeholders: any, pageHeight: number, scaleFactor: number) {
    try {
      let imageUrl = element.url;
      if (imageUrl === '{{foto}}' && placeholders['{{foto}}']) {
        imageUrl = placeholders['{{foto}}'];
      }

      if (!imageUrl || imageUrl === '{{foto}}') return;

      const imgBytes = await this.getFileBuffer(imageUrl);
      let img;
      
      // Intentar embeber imagen con reintento por formato
      try {
        if (imageUrl.toLowerCase().endsWith('.png')) {
          img = await pdfDoc.embedPng(imgBytes);
        } else {
          img = await pdfDoc.embedJpg(imgBytes);
        }
      } catch (embedError) {
        console.log(`[drawElementImage] Falló primer intento de embeber, intentando formato alternativo...`);
        try {
          // Si falló JPG, intentar PNG y viceversa
          if (imageUrl.toLowerCase().endsWith('.png')) {
            img = await pdfDoc.embedJpg(imgBytes);
          } else {
            img = await pdfDoc.embedPng(imgBytes);
          }
        } catch (retryError) {
          throw new Error(`No se pudo embeber la imagen como JPG ni como PNG: ${imageUrl}`);
        }
      }

      // Aplicamos el factor de escala a las dimensiones y coordenadas
      const width = Math.max(1, (Number(element.width) || img.width)) * scaleFactor;
      const height = Math.max(1, (Number(element.height) || img.height)) * scaleFactor;
      const x = (Number(element.x) || 0) * scaleFactor;
      const y = (Number(element.y) || 0) * scaleFactor;
      
      if (isNaN(width) || isNaN(height) || isNaN(x) || isNaN(y)) {
        console.warn(`[drawElementImage] Valores invalidos detectados:`, { width, height, x, y });
        return;
      }

      const rotate = degrees(-(Number(element.rotate) || 0));
      const opacity = Number(element.opacity) !== undefined ? Math.min(1, Math.max(0, Number(element.opacity) / 100)) : 1;

      page.drawImage(img, {
        x: x,
        y: pageHeight - y - height,
        width,
        height,
        rotate,
        opacity,
      });
    } catch (e) {
      console.error(`Error embedding image element: ${e.message}`);
    }
  }

  private async drawElementQR(pdfDoc: PDFDocument, page: any, element: any, code: string, pageHeight: number, scaleFactor: number) {
    try {
      const validationUrl = `https://enervida.com/validar/${code}`;
      const colorHex = element.color || '#000000';
      const qrDataUrl = await QRCode.toDataURL(validationUrl, { 
        margin: 1,
        color: {
          dark: colorHex,
          light: '#00000000' // Transparente
        }
      });
      const qrImageBytes = Buffer.from(qrDataUrl.split(',')[1], 'base64');
      const qrImage = await pdfDoc.embedPng(qrImageBytes);

      // Aplicamos el factor de escala
      const size = Math.max(1, (Number(element.size) || 100)) * scaleFactor;
      const x = (Number(element.x) || 0) * scaleFactor;
      const y = (Number(element.y) || 0) * scaleFactor;
      
      if (isNaN(size) || isNaN(x) || isNaN(y)) {
        console.warn(`[drawElementQR] Valores invalidos detectados:`, { size, x, y });
        return;
      }

      const rotate = degrees(-(Number(element.rotate) || 0));
      const opacity = Number(element.opacity) !== undefined ? Math.min(1, Math.max(0, Number(element.opacity) / 100)) : 1;

      page.drawImage(qrImage, {
        x: x,
        y: pageHeight - y - size,
        width: size,
        height: size,
        rotate,
        opacity,
      });
    } catch (e) {
      console.error(`Error generating QR: ${e.message}`);
    }
  }

  private async loadFont(pdfDoc: PDFDocument, fontFamily: string, bold: boolean, italic: boolean): Promise<PDFFont> {
    const family = fontFamily || 'Helvetica';
    
    // Lista de fuentes estándar de PDF
    const standardFamilies = ['Helvetica', 'Courier', 'Times-Roman', 'Times'];
    
    if (standardFamilies.includes(family)) {
        let fontName: StandardFonts;
        if (family === 'Courier') {
          if (bold && italic) fontName = StandardFonts.CourierBoldOblique;
          else if (bold) fontName = StandardFonts.CourierBold;
          else if (italic) fontName = StandardFonts.CourierOblique;
          else fontName = StandardFonts.Courier;
        } else if (family === 'Times-Roman' || family === 'Times') {
          if (bold && italic) fontName = StandardFonts.TimesRomanBoldItalic;
          else if (bold) fontName = StandardFonts.TimesRomanBold;
          else if (italic) fontName = StandardFonts.TimesRomanItalic;
          else fontName = StandardFonts.TimesRoman;
        } else {
          if (bold && italic) fontName = StandardFonts.HelveticaBoldOblique;
          else if (bold) fontName = StandardFonts.HelveticaBold;
          else if (italic) fontName = StandardFonts.HelveticaOblique;
          else fontName = StandardFonts.Helvetica;
        }
        return pdfDoc.embedFont(fontName);
    }

    // Si no es estándar, intentamos cargar como Google Font
    try {
        const fontBuffer = await this.fetchGoogleFont(family, bold, italic);
        if (fontBuffer) {
            return await pdfDoc.embedFont(fontBuffer);
        }
    } catch (error) {
        console.error(`Error embedding custom font ${family}:`, error.message);
    }

    // Fallback a Helvetica
    return pdfDoc.embedFont(StandardFonts.Helvetica);
  }

  private async fetchGoogleFont(family: string, bold: boolean, italic: boolean): Promise<Buffer | null> {
    const variant = bold && italic ? 'bolditalic' : bold ? 'bold' : italic ? 'italic' : 'regular';
    const cacheKey = `${family}-${variant}`;
    
    if (this.fontCache.has(cacheKey)) {
        return this.fontCache.get(cacheKey) || null;
    }

    // Intentamos buscar la URL de la fuente usando una API de búsqueda simple o URLs conocidas
    // Para el demo, usamos un mapeo directo de las fuentes añadidas en el frontend
    const fontMapping: any = {
        'Montserrat': 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/montserrat/static/Montserrat-Regular.ttf',
        'Montserrat-bold': 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/montserrat/static/Montserrat-Bold.ttf',
        'Roboto': 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/roboto/static/Roboto-Regular.ttf',
        'Roboto-bold': 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/roboto/static/Roboto-Bold.ttf',
        'Playfair Display': 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/playfairdisplay/static/PlayfairDisplay-Regular.ttf',
        'Playfair Display-bold': 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/playfairdisplay/static/PlayfairDisplay-Bold.ttf',
        'Great Vibes': 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/greatvibes/GreatVibes-Regular.ttf',
        'Dancing Script': 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/dancingscript/static/DancingScript-Regular.ttf',
        'Dancing Script-bold': 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/dancingscript/static/DancingScript-Bold.ttf',
        'Cinzel': 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/cinzel/static/Cinzel-Regular.ttf',
        'Cinzel-bold': 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/cinzel/static/Cinzel-Bold.ttf',
        'Inter': 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/inter/static/Inter-Regular.ttf',
        'Inter-bold': 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/inter/static/Inter-Bold.ttf',
        'Lora': 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/lora/static/Lora-Regular.ttf',
        'Lora-bold': 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/lora/static/Lora-Bold.ttf',
        'Alex Brush': 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/alexbrush/AlexBrush-Regular.ttf',
        'Pinyon Script': 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/pinyonscript/PinyonScript-Regular.ttf',
        'Open Sans': 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/opensans/static/OpenSans-Regular.ttf',
        'Open Sans-bold': 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/opensans/static/OpenSans-Bold.ttf',
        'Sacramento': 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/sacramento/Sacramento-Regular.ttf',
        'Parisienne': 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/parisienne/Parisienne-Regular.ttf'
    };

    const url = fontMapping[cacheKey] || fontMapping[family];
    if (!url) return null;

    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data);
        this.fontCache.set(cacheKey, buffer);
        return buffer;
    } catch (e) {
        console.error(`Error downloading font ${family}:`, e.message);
        return null;
    }
  }

  private hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : { r: 0, g: 0, b: 0 };
  }
}

