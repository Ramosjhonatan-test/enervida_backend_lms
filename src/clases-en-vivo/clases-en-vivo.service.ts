import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClaseEnVivoDto } from './dto/create-clase-en-vivo.dto';
import { UpdateClaseEnVivoDto } from './dto/update-clase-en-vivo.dto';

@Injectable()
export class ClaseEnVivosService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateClaseEnVivoDto) {
    return this.prisma.claseEnVivo.create({
      data: createDto as any,
    });
  }

  async findAll() {
    return this.prisma.claseEnVivo.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.claseEnVivo.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Registro no encontrado');
    return record;
  }

  async update(id: number, updateDto: UpdateClaseEnVivoDto) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.claseEnVivo.update({
      where: { id },
      data: updateDto as any,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.claseEnVivo.delete({
      where: { id },
    });
  }
}
