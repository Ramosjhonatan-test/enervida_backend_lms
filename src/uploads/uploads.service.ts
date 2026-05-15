import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadsService {
  private readonly uploadsDir = path.join(process.cwd(), 'public', 'uploads');

  constructor(private prisma: PrismaService) {}

  async findAll() {
    if (!fs.existsSync(this.uploadsDir)) {
      return [];
    }

    const files = fs.readdirSync(this.uploadsDir);
    const fileList: {
      filename: string;
      size: number;
      createdAt: Date;
      isUsed: boolean;
      usages: { type: string; name: string; id: number }[];
      url: string;
    }[] = [];

    for (const filename of files) {
      const filePath = path.join(this.uploadsDir, filename);
      const stats = fs.statSync(filePath);

      if (stats.isFile()) {
        const usages = await this.checkUsage(filename);
        fileList.push({
          filename,
          size: stats.size,
          createdAt: stats.birthtime,
          isUsed: usages.length > 0,
          usages,
          url: `/uploads/${filename}`,
        });
      }
    }

    return fileList;
  }

  async checkUsage(filename: string) {
    const fileUrl = `/uploads/${filename}`;
    
    const usages: { type: string; name: string; id: number }[] = [];

    // Check in Usuarios
    const usuarios = await this.prisma.usuario.findMany({
      where: {
        OR: [
          { imagen_perfil: { contains: filename } },
          { imagen_perfil: { contains: fileUrl } }
        ]
      },
      select: { id: true, nombres: true, apellidos: true },
      take: 1
    });
    usuarios.forEach(u => usages.push({ type: 'Usuario', name: `${u.nombres} ${u.apellidos}`, id: u.id }));

    // Check in Cursos (Miniatura)
    const cursos = await this.prisma.curso.findMany({
      where: {
        OR: [
          { miniatura_url: { contains: filename } },
          { miniatura_url: { contains: fileUrl } }
        ]
      },
      select: { id: true, titulo: true },
      take: 1
    });
    cursos.forEach(c => usages.push({ type: 'Curso (Miniatura)', name: c.titulo, id: c.id }));

    // Check in CertificadoPlantilla
    const plantillas = await this.prisma.certificadoPlantilla.findMany({
      where: {
        OR: [
          { background_url: { contains: filename } },
          { background_url: { contains: fileUrl } }
        ]
      },
      select: { id: true, nombre: true, curso_id: true },
      take: 1
    });
    plantillas.forEach(p => usages.push({ type: 'Plantilla Certificado', name: p.nombre, id: p.curso_id }));

    // Check in Lecciones (Video o PDF)
    const lecciones = await this.prisma.leccion.findMany({
      where: {
        OR: [
          { video_url: { contains: filename } },
          { video_url: { contains: fileUrl } },
          { pdf_url: { contains: filename } },
          { pdf_url: { contains: fileUrl } }
        ],
      },
      select: { 
        id: true, 
        titulo: true, 
        modulo: { select: { curso: { select: { id: true, titulo: true } } } } 
      },
      take: 3
    });
    lecciones.forEach(l => usages.push({ 
      type: 'Lección', 
      name: `${l.modulo?.curso?.titulo || 'Sin Curso'} > ${l.titulo}`, 
      id: l.modulo?.curso?.id || 0
    }));

    const searchPatterns = [filename, fileUrl];

    // Check in Certificados emitidos
    const certificados = await this.prisma.certificado.findMany({
      where: { OR: searchPatterns.map(p => ({ pdf_url: { contains: p } })) },
      select: { id: true, codigo_certificado: true },
      take: 1
    });
    certificados.forEach(c => usages.push({ type: 'Certificado Emitido', name: c.codigo_certificado, id: c.id }));

    return usages;
  }

  async deleteFile(filename: string) {
    const filePath = path.join(this.uploadsDir, filename);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Archivo no encontrado');
    }

    fs.unlinkSync(filePath);
    return { message: 'Archivo eliminado con éxito' };
  }

  async deleteBulk(filenames: string[]) {
    let deletedCount = 0;
    const errors: string[] = [];

    for (const filename of filenames) {
      try {
        const usages = await this.checkUsage(filename);
        if (usages.length > 0) {
          errors.push(`El archivo ${filename} está en uso y no puede ser eliminado.`);
          continue;
        }

        const filePath = path.join(this.uploadsDir, filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          deletedCount++;
        }
      } catch (error) {
        errors.push(`Error eliminando ${filename}: ${error.message}`);
      }
    }

    return {
      message: `${deletedCount} archivos eliminados con éxito`,
      deletedCount,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
}
