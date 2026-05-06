"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificadosService = void 0;
const common_1 = require("@nestjs/common");
const pdf_lib_1 = require("pdf-lib");
const axios_1 = __importDefault(require("axios"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const QRCode = __importStar(require("qrcode"));
const fontkit_1 = __importDefault(require("@pdf-lib/fontkit"));
const prisma_service_1 = require("../prisma/prisma.service");
let CertificadosService = class CertificadosService {
    prisma;
    fontCache = new Map();
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        return this.prisma.certificado.create({
            data: createDto,
        });
    }
    async issueCertificate(usuarioIdRaw, cursoIdRaw) {
        const usuario_id = Number(usuarioIdRaw);
        const curso_id = Number(cursoIdRaw);
        console.log(`[issueCertificate] usuario_id: ${usuario_id}, curso_id: ${curso_id}`);
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
        const existing = await this.prisma.certificado.findFirst({
            where: { usuario_id, curso_id }
        });
        if (existing)
            return existing;
        const codigo = `EV-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
        return this.prisma.certificado.create({
            data: {
                usuario_id,
                curso_id,
                codigo_certificado: codigo,
                pdf_url: '',
                fecha_emision: new Date(),
            }
        });
    }
    async findAll() {
        return this.prisma.certificado.findMany({
            include: { curso: true }
        });
    }
    async findByUserId(userId) {
        return this.prisma.certificado.findMany({
            where: { usuario_id: userId },
            include: { curso: true }
        });
    }
    async findOne(id) {
        const record = await this.prisma.certificado.findUnique({ where: { id } });
        if (!record)
            throw new common_1.NotFoundException('Registro no encontrado');
        return record;
    }
    async update(id, updateDto) {
        await this.findOne(id);
        return this.prisma.certificado.update({
            where: { id },
            data: updateDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.certificado.delete({
            where: { id },
        });
    }
    async generatePdf(id) {
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
        if (!certificado)
            throw new common_1.NotFoundException('Certificado no encontrado');
        const plantilla = certificado.curso.plantilla_certificado;
        if (!plantilla)
            throw new common_1.NotFoundException('Este curso no tiene una plantilla de certificado configurada');
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
    async generatePreview(plantillaId) {
        try {
            console.log(`[generatePreview] Iniciando preview para plantilla: ${plantillaId}`);
            const plantilla = await this.prisma.certificadoPlantilla.findUnique({
                where: { id: plantillaId },
                include: { curso: { include: { instructor: true, categoria: true } } }
            });
            if (!plantilla) {
                console.error(`[generatePreview] Plantilla ${plantillaId} no encontrada`);
                throw new common_1.NotFoundException('Plantilla no encontrada');
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
        }
        catch (error) {
            console.error(`[generatePreview] ERROR CRÍTICO AL GENERAR PREVIEW:`, error);
            if (error.stack)
                console.error(error.stack);
            throw error;
        }
    }
    async renderCertificate(plantilla, placeholders) {
        console.log(`[renderCertificate] Iniciando renderizado para plantilla: ${plantilla.id}`);
        let config = plantilla.config;
        if (typeof config === 'string') {
            try {
                config = JSON.parse(config);
            }
            catch (e) {
                console.error('[renderCertificate] Error parsing config string:', e);
                config = {};
            }
        }
        config = config || {};
        const elements = config.elements || [];
        const formatKey = config.selectedFormat || 'A4';
        const orientation = config.orientation || 'landscape';
        const pageFormats = {
            'A4': [595.28, 841.89],
            'Letter': [612, 792],
            'Legal': [612, 1008],
            'Oficio': [612, 936],
            'Custom': [config.logicalHeight || 707, config.logicalWidth || 1000],
        };
        const baseFormat = pageFormats[formatKey] || pageFormats['A4'];
        const pageWidth = orientation === 'landscape' ? Math.max(baseFormat[0], baseFormat[1]) : Math.min(baseFormat[0], baseFormat[1]);
        const pageHeight = orientation === 'landscape' ? Math.min(baseFormat[0], baseFormat[1]) : Math.max(baseFormat[0], baseFormat[1]);
        console.log(`[renderCertificate] Formato: ${formatKey}, Orientación: ${orientation}, Tamaño PDF: ${pageWidth.toFixed(2)}x${pageHeight.toFixed(2)}`);
        const pdfDoc = await pdf_lib_1.PDFDocument.create();
        pdfDoc.registerFontkit(fontkit_1.default);
        const page = pdfDoc.addPage([pageWidth, pageHeight]);
        let backgroundImage = null;
        if (plantilla.background_url && plantilla.background_url.trim() !== '') {
            try {
                console.log(`[renderCertificate] Cargando fondo: ${plantilla.background_url}`);
                const backgroundBuffer = await this.getFileBuffer(plantilla.background_url);
                try {
                    backgroundImage = await pdfDoc.embedJpg(backgroundBuffer);
                }
                catch (e) {
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
            }
            catch (error) {
                console.error(`[renderCertificate] Error cargando imagen de fondo: ${plantilla.background_url}`, error.message);
            }
        }
        else {
            console.warn(`[renderCertificate] No se pudo cargar la imagen de fondo, se usará página en blanco`);
        }
        const logicalWidth = config.logicalWidth || 1000;
        const scaleFactor = pageWidth / logicalWidth;
        if (Array.isArray(elements)) {
            for (const element of elements) {
                try {
                    if (element.type === 'text') {
                        await this.drawElementText(pdfDoc, page, element, placeholders, pageHeight, scaleFactor);
                    }
                    else if (element.type === 'image') {
                        await this.drawElementImage(pdfDoc, page, element, placeholders, pageHeight, scaleFactor);
                    }
                    else if (element.type === 'qr') {
                        await this.drawElementQR(pdfDoc, page, element, placeholders['{{codigo}}'] || 'VALIDATION', pageHeight, scaleFactor);
                    }
                }
                catch (elError) {
                    console.error(`[renderCertificate] Error renderizando elemento ${element.type}:`, elError.message);
                }
            }
        }
        else {
            console.warn(`[renderCertificate] elements no es un array:`, elements);
        }
        try {
            const pdfBytes = await pdfDoc.save();
            return Buffer.from(pdfBytes);
        }
        catch (saveError) {
            console.error(`[renderCertificate] Error al salvar PDF:`, saveError.message);
            throw saveError;
        }
    }
    async getFileBuffer(url) {
        try {
            if (url.startsWith('http')) {
                const response = await axios_1.default.get(url, {
                    responseType: 'arraybuffer',
                    timeout: 15000,
                    headers: { 'Accept': 'image/*, font/*' }
                });
                return Buffer.from(response.data);
            }
            else {
                const publicPath = path.join(process.cwd(), 'public');
                const cleanUrl = url.startsWith('/public') ? url.replace('/public', '') : url;
                const fullPath = path.join(publicPath, cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`);
                if (!fs.existsSync(fullPath)) {
                    console.warn(`[getFileBuffer] Archivo local no encontrado: ${fullPath}`);
                    throw new Error(`Archivo no encontrado: ${url}`);
                }
                return fs.readFileSync(fullPath);
            }
        }
        catch (error) {
            console.error(`[getFileBuffer] Error cargando recurso (${url}):`, error.message);
            throw error;
        }
    }
    async drawElementText(pdfDoc, page, element, placeholders, pageHeight, scaleFactor) {
        let content = element.content || '';
        Object.keys(placeholders).forEach(key => {
            content = content.replace(new RegExp(key, 'g'), placeholders[key] || '');
        });
        const font = await this.loadFont(pdfDoc, element.fontFamily, element.bold, element.italic);
        const rgbColor = this.hexToRgb(element.color || '#000000');
        const rotate = (0, pdf_lib_1.degrees)(-(Number(element.rotate) || 0));
        const opacity = Number(element.opacity) !== undefined ? Number(element.opacity) / 100 : 1;
        const fontSize = Math.max(1, (Number(element.size) || 12)) * scaleFactor;
        const maxWidth = Math.max(1, (Number(element.width) || 500)) * scaleFactor;
        const x = (Number(element.x) || 0) * scaleFactor;
        const y = (Number(element.y) || 0) * scaleFactor;
        if (isNaN(fontSize) || isNaN(maxWidth) || isNaN(x) || isNaN(y)) {
            console.warn(`[drawElementText] Valores invalidos detectados:`, { fontSize, maxWidth, x, y });
            return;
        }
        const paragraphs = content.split('\n');
        let lines = [];
        for (const paragraph of paragraphs) {
            const words = paragraph.split(' ');
            let currentLine = '';
            for (const word of words) {
                let testLine = currentLine ? `${currentLine} ${word}` : word;
                let testWidth = font.widthOfTextAtSize(testLine, fontSize);
                if (testWidth > maxWidth) {
                    if (!currentLine) {
                        lines.push(word);
                        currentLine = '';
                    }
                    else {
                        lines.push(currentLine);
                        currentLine = word;
                        if (font.widthOfTextAtSize(currentLine, fontSize) > maxWidth) {
                        }
                    }
                }
                else {
                    currentLine = testLine;
                }
            }
            if (currentLine)
                lines.push(currentLine);
        }
        const lineHeight = fontSize * 1.2;
        for (let i = 0; i < lines.length; i++) {
            const lineText = lines[i];
            const textWidth = font.widthOfTextAtSize(lineText, fontSize);
            let drawX = x;
            if (element.textAlign === 'center') {
                drawX = x + (maxWidth / 2) - (textWidth / 2);
            }
            else if (element.textAlign === 'right') {
                drawX = x + maxWidth - textWidth;
            }
            page.drawText(lineText, {
                x: drawX,
                y: pageHeight - y - (lineHeight * (i + 1)) + (fontSize * 0.25),
                size: fontSize,
                font,
                color: (0, pdf_lib_1.rgb)(rgbColor.r, rgbColor.g, rgbColor.b),
                rotate,
                opacity,
            });
        }
    }
    async drawElementImage(pdfDoc, page, element, placeholders, pageHeight, scaleFactor) {
        try {
            let imageUrl = element.url;
            if (imageUrl === '{{foto}}' && placeholders['{{foto}}']) {
                imageUrl = placeholders['{{foto}}'];
            }
            if (!imageUrl || imageUrl === '{{foto}}')
                return;
            const imgBytes = await this.getFileBuffer(imageUrl);
            let img;
            try {
                if (imageUrl.toLowerCase().endsWith('.png')) {
                    img = await pdfDoc.embedPng(imgBytes);
                }
                else {
                    img = await pdfDoc.embedJpg(imgBytes);
                }
            }
            catch (embedError) {
                console.log(`[drawElementImage] Falló primer intento de embeber, intentando formato alternativo...`);
                try {
                    if (imageUrl.toLowerCase().endsWith('.png')) {
                        img = await pdfDoc.embedJpg(imgBytes);
                    }
                    else {
                        img = await pdfDoc.embedPng(imgBytes);
                    }
                }
                catch (retryError) {
                    throw new Error(`No se pudo embeber la imagen como JPG ni como PNG: ${imageUrl}`);
                }
            }
            const width = Math.max(1, (Number(element.width) || img.width)) * scaleFactor;
            const height = Math.max(1, (Number(element.height) || img.height)) * scaleFactor;
            const x = (Number(element.x) || 0) * scaleFactor;
            const y = (Number(element.y) || 0) * scaleFactor;
            if (isNaN(width) || isNaN(height) || isNaN(x) || isNaN(y)) {
                console.warn(`[drawElementImage] Valores invalidos detectados:`, { width, height, x, y });
                return;
            }
            const rotate = (0, pdf_lib_1.degrees)(-(Number(element.rotate) || 0));
            const opacity = Number(element.opacity) !== undefined ? Math.min(1, Math.max(0, Number(element.opacity) / 100)) : 1;
            page.drawImage(img, {
                x: x,
                y: pageHeight - y - height,
                width,
                height,
                rotate,
                opacity,
            });
        }
        catch (e) {
            console.error(`Error embedding image element: ${e.message}`);
        }
    }
    async drawElementQR(pdfDoc, page, element, code, pageHeight, scaleFactor) {
        try {
            const validationUrl = `https://enervida.com/validar/${code}`;
            const colorHex = element.color || '#000000';
            const qrDataUrl = await QRCode.toDataURL(validationUrl, {
                margin: 1,
                color: {
                    dark: colorHex,
                    light: '#00000000'
                }
            });
            const qrImageBytes = Buffer.from(qrDataUrl.split(',')[1], 'base64');
            const qrImage = await pdfDoc.embedPng(qrImageBytes);
            const size = Math.max(1, (Number(element.size) || 100)) * scaleFactor;
            const x = (Number(element.x) || 0) * scaleFactor;
            const y = (Number(element.y) || 0) * scaleFactor;
            if (isNaN(size) || isNaN(x) || isNaN(y)) {
                console.warn(`[drawElementQR] Valores invalidos detectados:`, { size, x, y });
                return;
            }
            const rotate = (0, pdf_lib_1.degrees)(-(Number(element.rotate) || 0));
            const opacity = Number(element.opacity) !== undefined ? Math.min(1, Math.max(0, Number(element.opacity) / 100)) : 1;
            page.drawImage(qrImage, {
                x: x,
                y: pageHeight - y - size,
                width: size,
                height: size,
                rotate,
                opacity,
            });
        }
        catch (e) {
            console.error(`Error generating QR: ${e.message}`);
        }
    }
    async loadFont(pdfDoc, fontFamily, bold, italic) {
        const family = fontFamily || 'Helvetica';
        const standardFamilies = ['Helvetica', 'Courier', 'Times-Roman', 'Times'];
        if (standardFamilies.includes(family)) {
            let fontName;
            if (family === 'Courier') {
                if (bold && italic)
                    fontName = pdf_lib_1.StandardFonts.CourierBoldOblique;
                else if (bold)
                    fontName = pdf_lib_1.StandardFonts.CourierBold;
                else if (italic)
                    fontName = pdf_lib_1.StandardFonts.CourierOblique;
                else
                    fontName = pdf_lib_1.StandardFonts.Courier;
            }
            else if (family === 'Times-Roman' || family === 'Times') {
                if (bold && italic)
                    fontName = pdf_lib_1.StandardFonts.TimesRomanBoldItalic;
                else if (bold)
                    fontName = pdf_lib_1.StandardFonts.TimesRomanBold;
                else if (italic)
                    fontName = pdf_lib_1.StandardFonts.TimesRomanItalic;
                else
                    fontName = pdf_lib_1.StandardFonts.TimesRoman;
            }
            else {
                if (bold && italic)
                    fontName = pdf_lib_1.StandardFonts.HelveticaBoldOblique;
                else if (bold)
                    fontName = pdf_lib_1.StandardFonts.HelveticaBold;
                else if (italic)
                    fontName = pdf_lib_1.StandardFonts.HelveticaOblique;
                else
                    fontName = pdf_lib_1.StandardFonts.Helvetica;
            }
            return pdfDoc.embedFont(fontName);
        }
        try {
            const fontBuffer = await this.fetchGoogleFont(family, bold, italic);
            if (fontBuffer) {
                return await pdfDoc.embedFont(fontBuffer);
            }
        }
        catch (error) {
            console.error(`Error embedding custom font ${family}:`, error.message);
        }
        return pdfDoc.embedFont(pdf_lib_1.StandardFonts.Helvetica);
    }
    async fetchGoogleFont(family, bold, italic) {
        const variant = bold && italic ? 'bolditalic' : bold ? 'bold' : italic ? 'italic' : 'regular';
        const cacheKey = `${family}-${variant}`;
        if (this.fontCache.has(cacheKey)) {
            return this.fontCache.get(cacheKey) || null;
        }
        const fontMapping = {
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
        if (!url)
            return null;
        try {
            const response = await axios_1.default.get(url, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(response.data);
            this.fontCache.set(cacheKey, buffer);
            return buffer;
        }
        catch (e) {
            console.error(`Error downloading font ${family}:`, e.message);
            return null;
        }
    }
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16) / 255,
            g: parseInt(result[2], 16) / 255,
            b: parseInt(result[3], 16) / 255
        } : { r: 0, g: 0, b: 0 };
    }
};
exports.CertificadosService = CertificadosService;
exports.CertificadosService = CertificadosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CertificadosService);
//# sourceMappingURL=certificados.service.js.map