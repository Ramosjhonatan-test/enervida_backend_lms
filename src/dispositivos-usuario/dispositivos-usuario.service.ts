import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDispositivoUsuarioDto } from './dto/create-dispositivo-usuario.dto';
import { UpdateDispositivoUsuarioDto } from './dto/update-dispositivo-usuario.dto';

@Injectable()
export class DispositivoUsuariosService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateDispositivoUsuarioDto) {
    return this.prisma.dispositivoUsuario.create({
      data: createDto as any,
    });
  }

  async findAll() {
    return this.prisma.dispositivoUsuario.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.dispositivoUsuario.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Registro no encontrado');
    return record;
  }

  async update(id: number, updateDto: UpdateDispositivoUsuarioDto) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.dispositivoUsuario.update({
      where: { id },
      data: updateDto as any,
    });
  }

  async deactivateAllForUser(usuarioId: number) {
    return this.prisma.dispositivoUsuario.updateMany({
      where: { usuario_id: usuarioId, activo: true },
      data: { activo: false },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.dispositivoUsuario.delete({
      where: { id },
    });
  }
}
