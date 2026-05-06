import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { UpdateNotificacionDto } from './dto/update-notificacion.dto';

@Injectable()
export class NotificacionsService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateNotificacionDto) {
    return this.prisma.notificacion.create({
      data: createDto as any,
    });
  }

  async findAll() {
    return this.prisma.notificacion.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.notificacion.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Registro no encontrado');
    return record;
  }

  async update(id: number, updateDto: UpdateNotificacionDto) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.notificacion.update({
      where: { id },
      data: updateDto as any,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.notificacion.delete({
      where: { id },
    });
  }
}
