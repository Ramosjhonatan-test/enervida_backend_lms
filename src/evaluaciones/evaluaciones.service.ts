import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';
import { UpdateEvaluacionDto } from './dto/update-evaluacion.dto';

@Injectable()
export class EvaluacionsService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateEvaluacionDto) {
    return this.prisma.evaluacion.create({
      data: createDto as any,
    });
  }

  async findAll() {
    return this.prisma.evaluacion.findMany({
      include: {
        curso: {
          select: { titulo: true }
        },
        _count: {
          select: { preguntas: true }
        }
      }
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.evaluacion.findUnique({ 
      where: { id },
      include: {
        preguntas: {
          include: {
            respuestas: true
          }
        }
      }
    });
    if (!record) throw new NotFoundException('Registro no encontrado');
    return record;
  }

  async update(id: number, updateDto: UpdateEvaluacionDto) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.evaluacion.update({
      where: { id },
      data: updateDto as any,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.evaluacion.delete({
      where: { id },
    });
  }
}
