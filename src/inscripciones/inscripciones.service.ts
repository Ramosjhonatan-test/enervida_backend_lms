import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';

@Injectable()
export class InscripcionsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createDto: CreateInscripcionDto) {
    const { curso_id } = createDto;
    
    // Verificar si ya existe una inscripción (activa o pendiente)
    const existing = await this.prisma.inscripcion.findFirst({
      where: { usuario_id: userId, curso_id }
    });

    if (existing) {
      return existing; 
    }

    // Limpiar progreso previo si existe para asegurar un inicio desde cero
    await this.prisma.progresoLeccion.deleteMany({
      where: {
        usuario_id: userId,
        leccion: { modulo: { curso_id } }
      }
    });

    return this.prisma.inscripcion.create({
      data: {
        ...createDto,
        usuario_id: userId, // Forzar el ID del usuario autenticado
        estado: 'PENDIENTE',
        porcentaje_progreso: 0, // Iniciar siempre en 0 para evitar fugas de progreso
      } as any,
    });
  }

  async findAll() {
    return this.prisma.inscripcion.findMany({
      include: { 
        curso: true,
        usuario: {
          select: {
            id: true,
            nombres: true,
            apellidos: true,
            correo: true,
            telefono: true,
            ci: true,
            imagen_perfil: true
          }
        }
      },
      orderBy: { fecha_inscripcion: 'desc' }
    });
  }

  async findByUser(usuarioId: number) {
    return this.prisma.inscripcion.findMany({
      where: { usuario_id: usuarioId },
      include: {
        curso: {
          include: {
            categoria: true,
            instructor: {
              select: { nombres: true, apellidos: true }
            }
          }
        }
      }
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.inscripcion.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Registro no encontrado');
    return record;
  }

  async update(id: number, updateDto: UpdateInscripcionDto) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.inscripcion.update({
      where: { id },
      data: updateDto as any,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.inscripcion.delete({
      where: { id },
    });
  }
}
