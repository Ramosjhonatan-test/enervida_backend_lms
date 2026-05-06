import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';

@Injectable()
export class PreguntasService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreatePreguntaDto) {
    return this.prisma.pregunta.create({
      data: createDto as any,
    });
  }

  async findAll() {
    return this.prisma.pregunta.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.pregunta.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Registro no encontrado');
    return record;
  }

  async update(id: number, updateDto: UpdatePreguntaDto) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.pregunta.update({
      where: { id },
      data: updateDto as any,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.pregunta.delete({
      where: { id },
    });
  }
}
