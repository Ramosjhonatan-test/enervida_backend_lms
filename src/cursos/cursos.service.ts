import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Injectable()
export class CursosService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateCursoDto) {
    return this.prisma.curso.create({
      data: createDto as any,
    });
  }

  async findAll() {
    const cursos = await this.prisma.curso.findMany({
      include: { 
        categoria: true, 
        instructor: { select: { nombres: true, apellidos: true } },
        plantilla_certificado: true
      }
    });
    console.log('Cursos with templates:', JSON.stringify(cursos.map(c => ({ id: c.id, hasTemplate: !!c.plantilla_certificado })), null, 2));
    return cursos;
  }

  async findPublished() {
    return this.prisma.curso.findMany({
      where: { publicado: true },
      include: { 
        categoria: true, 
        instructor: { select: { nombres: true, apellidos: true } },
        modulos: {
          orderBy: { orden_modulo: 'asc' }
        }
      }
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.curso.findUnique({ 
      where: { id },
      include: {
        categoria: true,
        instructor: true,
        plantilla_certificado: true,
        modulos: {
          orderBy: { orden_modulo: 'asc' },
          include: {
            lecciones: {
              orderBy: { orden_leccion: 'asc' }
            }
          }
        },
        evaluaciones: true
      }
    });
    if (!record) throw new NotFoundException('Registro no encontrado');
    return record;
  }

  async update(id: number, updateDto: UpdateCursoDto) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.curso.update({
      where: { id },
      data: updateDto as any,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.curso.delete({
      where: { id },
    });
  }
}
