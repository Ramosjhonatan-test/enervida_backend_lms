import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCertificadoPlantillaDto } from './dto/create-certificado-plantilla.dto';
import { UpdateCertificadoPlantillaDto } from './dto/update-certificado-plantilla.dto';

@Injectable()
export class CertificadoPlantillasService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateCertificadoPlantillaDto) {
    return this.prisma.certificadoPlantilla.create({
      data: createDto,
    });
  }

  async findAll() {
    return this.prisma.certificadoPlantilla.findMany({
      include: { curso: true }
    });
  }

  async findByCurso(cursoId: number) {
    return this.prisma.certificadoPlantilla.findUnique({
      where: { curso_id: cursoId }
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.certificadoPlantilla.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Plantilla no encontrada');
    return record;
  }

  async update(id: number, updateDto: UpdateCertificadoPlantillaDto) {
    return this.prisma.certificadoPlantilla.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: number) {
    return this.prisma.certificadoPlantilla.delete({
      where: { id },
    });
  }
}
