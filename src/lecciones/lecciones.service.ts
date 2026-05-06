import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeccionDto } from './dto/create-leccion.dto';
import { UpdateLeccionDto } from './dto/update-leccion.dto';

@Injectable()
export class LeccionsService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateLeccionDto) {
    return this.prisma.leccion.create({
      data: createDto as any,
    });
  }

  async findAll() {
    return this.prisma.leccion.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.leccion.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Registro no encontrado');
    return record;
  }

  async update(id: number, updateDto: UpdateLeccionDto) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.leccion.update({
      where: { id },
      data: updateDto as any,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.leccion.delete({
      where: { id },
    });
  }
}
