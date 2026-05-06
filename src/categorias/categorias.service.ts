import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateCategoriaDto) {
    return this.prisma.categoria.create({
      data: createDto as any,
    });
  }

  async findAll() {
    return this.prisma.categoria.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.categoria.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Registro no encontrado');
    return record;
  }

  async update(id: number, updateDto: UpdateCategoriaDto) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.categoria.update({
      where: { id },
      data: updateDto as any,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.categoria.delete({
      where: { id },
    });
  }
}
