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

  async log(params: {
    usuario_id?: number;
    accion: string;
    entidad: string;
    entidad_id?: number;
    descripcion?: string;
    valores_anteriores?: any;
    valores_nuevos?: any;
    direccion_ip?: string;
    user_agent?: string;
    metodo_request?: string;
    endpoint?: string;
  }) {
    return this.prisma.auditoriaLog.create({
      data: {
        usuario_id: params.usuario_id || null,
        accion: params.accion,
        entidad: params.entidad,
        entidad_id: params.entidad_id || null,
        descripcion: params.descripcion || null,
        valores_anteriores: params.valores_anteriores || null,
        valores_nuevos: params.valores_nuevos || null,
        direccion_ip: params.direccion_ip || '0.0.0.0',
        user_agent: params.user_agent || 'unknown',
        metodo_request: params.metodo_request || 'N/A',
        endpoint: params.endpoint || 'N/A',
      }
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

  async deleteAll() {
    return this.prisma.auditoriaLog.deleteMany();
  }
}
