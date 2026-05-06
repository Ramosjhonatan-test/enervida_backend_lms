import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParticipanteClaseEnVivoDto } from './dto/create-participante-clase-en-vivo.dto';
import { UpdateParticipanteClaseEnVivoDto } from './dto/update-participante-clase-en-vivo.dto';

@Injectable()
export class ParticipanteClaseEnVivosService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateParticipanteClaseEnVivoDto) {
    return this.prisma.participanteClaseEnVivo.create({
      data: createDto as any,
    });
  }

  async findAll() {
    return this.prisma.participanteClaseEnVivo.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.participanteClaseEnVivo.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Registro no encontrado');
    return record;
  }

  async update(id: number, updateDto: UpdateParticipanteClaseEnVivoDto) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.participanteClaseEnVivo.update({
      where: { id },
      data: updateDto as any,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.participanteClaseEnVivo.delete({
      where: { id },
    });
  }
}
