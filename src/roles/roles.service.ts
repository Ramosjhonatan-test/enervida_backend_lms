import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Injectable()
export class RolsService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateRolDto) {
    return this.prisma.rol.create({
      data: createDto as any,
    });
  }

  async findAll() {
    return this.prisma.rol.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.rol.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Registro no encontrado');
    return record;
  }

  async update(id: number, updateDto: UpdateRolDto) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.rol.update({
      where: { id },
      data: updateDto as any,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.rol.delete({
      where: { id },
    });
  }
}
