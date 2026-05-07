import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProgresoLeccionDto } from './dto/create-progreso-leccion.dto';
import { UpdateProgresoLeccionDto } from './dto/update-progreso-leccion.dto';

@Injectable()
export class ProgresoLeccionsService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateProgresoLeccionDto) {
    // Si no se especifica completado, asumimos true al crear el registro
    const data = { ...createDto, completado: createDto['completado'] ?? true };
    
    const registro = await this.prisma.progresoLeccion.create({
      data: data as any,
    });

    // Actualizar porcentaje en la inscripción de forma asíncrona (no bloqueante para la respuesta)
    this.updateInscriptionProgress(createDto.usuario_id, createDto.leccion_id).catch(err => 
      console.error('Error actualizando progreso de inscripción:', err)
    );

    return registro;
  }

  async updateInscriptionProgress(usuario_id: number, leccion_id: number) {
    const leccion = await this.prisma.leccion.findUnique({
      where: { id: leccion_id },
      include: { modulo: true }
    });

    if (!leccion) return;
    const curso_id = leccion.modulo.curso_id;

    // Contar lecciones totales
    const total = await this.prisma.leccion.count({
      where: { modulo: { curso_id } }
    });

    // Contar completadas
    const completadas = await this.prisma.progresoLeccion.count({
      where: {
        usuario_id,
        completado: true,
        leccion: { modulo: { curso_id } }
      }
    });

    const porcentaje = total > 0 ? (completadas / total) * 100 : 0;

    // Actualizar inscripción
    await this.prisma.inscripcion.updateMany({
      where: { usuario_id, curso_id },
      data: { 
        porcentaje_progreso: porcentaje,
        fecha_completado: porcentaje >= 100 ? new Date() : null
      }
    });
  }

  async findAll(usuario_id?: number) {
    if (usuario_id) {
      return this.prisma.progresoLeccion.findMany({
        where: { usuario_id }
      });
    }
    return this.prisma.progresoLeccion.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.progresoLeccion.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Registro no encontrado');
    return record;
  }

  async update(id: number, updateDto: UpdateProgresoLeccionDto) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.progresoLeccion.update({
      where: { id },
      data: updateDto as any,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.progresoLeccion.delete({
      where: { id },
    });
  }
}
