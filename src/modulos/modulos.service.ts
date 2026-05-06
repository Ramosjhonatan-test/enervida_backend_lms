import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';

@Injectable()
export class ModulosService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateModuloDto) {
    return this.prisma.modulo.create({
      data: createDto as any,
    });
  }

  async findAll() {
    return this.prisma.modulo.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.modulo.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Registro no encontrado');
    return record;
  }

  async update(id: number, updateDto: UpdateModuloDto) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.modulo.update({
      where: { id },
      data: updateDto as any,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.modulo.delete({
      where: { id },
    });
  }
}
