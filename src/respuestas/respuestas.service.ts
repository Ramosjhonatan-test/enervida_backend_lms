import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { UpdateRespuestaDto } from './dto/update-respuesta.dto';

@Injectable()
export class RespuestasService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateRespuestaDto) {
    return this.prisma.respuesta.create({
      data: createDto as any,
    });
  }

  async findAll() {
    return this.prisma.respuesta.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.respuesta.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Registro no encontrado');
    return record;
  }

  async update(id: number, updateDto: UpdateRespuestaDto) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.respuesta.update({
      where: { id },
      data: updateDto as any,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.respuesta.delete({
      where: { id },
    });
  }
}
