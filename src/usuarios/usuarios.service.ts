import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateUsuarioDto) {
    const { contrasena, ...rest } = createDto as any;
    const data = { ...rest };
    if (contrasena) {
      data.contrasena_hash = await bcrypt.hash(contrasena, 10);
    }
    try {
      return await this.prisma.usuario.create({
        data,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        const target = error.meta?.target || [];
        if (target.includes('ci')) {
          throw new BadRequestException('La cédula/DNI ya está registrada por otro usuario.');
        }
        if (target.includes('correo')) {
          throw new BadRequestException('El correo electrónico ya está registrado por otro usuario.');
        }
        throw new BadRequestException('Ya existe un registro con estos datos únicos.');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.usuario.findMany({
      include: { rol: true }
    });
  }

  async findByRole(roleName: string) {
    return this.prisma.usuario.findMany({
      where: {
        rol: {
          nombre: {
            equals: roleName,
            mode: 'insensitive'
          }
        }
      },
      include: { rol: true, inscripciones: true }
    });
  }

  async findOne(id: number) {
    if (!id) throw new NotFoundException('ID de usuario no proporcionado');
    const record = await this.prisma.usuario.findUnique({ 
      where: { id },
      include: {
        rol: true,
        inscripciones: {
          include: {
            curso: {
              select: { titulo: true, miniatura_url: true, categoria: { select: { nombre: true } } }
            }
          }
        },
        intentos_evaluacion: {
          include: {
            evaluacion: {
              select: { titulo: true, nota_aprobacion: true }
            }
          },
          orderBy: { fecha_inicio: 'desc' }
        },
        auditoria_logs: {
          take: 50,
          orderBy: { fecha_creacion: 'desc' }
        },
        dispositivos: {
          where: { activo: true },
          orderBy: { fecha_creacion: 'desc' }
        }
      }
    });
    if (!record) throw new NotFoundException('Registro no encontrado');
    return record;
  }

  async update(id: number, updateDto: UpdateUsuarioDto) {
    await this.findOne(id); // Verifica existencia
    const { contrasena, ...rest } = updateDto as any;
    const data = { ...rest };

    if (contrasena) {
      data.contrasena_hash = await bcrypt.hash(contrasena, 10);
    }

    try {
      return await this.prisma.usuario.update({
        where: { id },
        data,
      });
    } catch (error) {
      // Manejar error de unicidad (P2002 es el código de Prisma para Unique Constraint Violation)
      if (error.code === 'P2002') {
        const target = error.meta?.target || [];
        if (target.includes('ci')) {
          throw new BadRequestException('La cédula/DNI ya está registrada por otro usuario.');
        }
        if (target.includes('correo')) {
          throw new BadRequestException('El correo electrónico ya está registrado por otro usuario.');
        }
        throw new BadRequestException('Ya existe un registro con estos datos únicos.');
      }
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.usuario.delete({
      where: { id },
    });
  }
}
