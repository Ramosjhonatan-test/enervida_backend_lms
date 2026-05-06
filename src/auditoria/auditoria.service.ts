import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuditoriaLogDto } from './dto/create-auditoria-log.dto';
import { UpdateAuditoriaLogDto } from './dto/update-auditoria-log.dto';

@Injectable()
export class AuditoriaLogsService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateAuditoriaLogDto) {
    return this.prisma.auditoriaLog.create({
      data: createDto as any,
    });
  }

  async findAll() {
    return this.prisma.auditoriaLog.findMany({
      include: {
        usuario: {
          select: { nombres: true, apellidos: true, correo: true }
        }
      },
      orderBy: { fecha_creacion: 'desc' }
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.auditoriaLog.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Registro no encontrado');
    return record;
  }

  async update(id: number, updateDto: UpdateAuditoriaLogDto) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.auditoriaLog.update({
      where: { id },
      data: updateDto as any,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.auditoriaLog.delete({
      where: { id },
    });
  }
}
