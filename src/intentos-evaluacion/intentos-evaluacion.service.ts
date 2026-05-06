import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIntentoEvaluacionDto } from './dto/create-intento-evaluacion.dto';
import { UpdateIntentoEvaluacionDto } from './dto/update-intento-evaluacion.dto';
import { CertificadosService } from '../certificados/certificados.service';

@Injectable()
export class IntentoEvaluacionsService {
  constructor(
    private prisma: PrismaService,
    private certificadosService: CertificadosService
  ) {}

  async create(createDto: CreateIntentoEvaluacionDto) {
    const usuario_id = Number(createDto.usuario_id);
    const evaluacion_id = Number(createDto.evaluacion_id);

    // 1. Obtener la evaluación con sus límites de intentos
    const evaluacion = await this.prisma.evaluacion.findUnique({
      where: { id: evaluacion_id },
      select: { nota_aprobacion: true, curso_id: true, intentos_permitidos: true }
    });

    if (!evaluacion) {
      throw new NotFoundException('Evaluación no encontrada.');
    }

    // 2. Verificar si el usuario ya agotó sus intentos
    const intentosPrevios = await this.prisma.intentoEvaluacion.count({
      where: { evaluacion_id, usuario_id }
    });

    const maxIntentos = evaluacion.intentos_permitidos || 1;
    if (intentosPrevios >= maxIntentos) {
      throw new BadRequestException(
        `Has agotado tus ${maxIntentos} intento(s) permitido(s) para esta evaluación.`
      );
    }

    // 3. Verificar si ya aprobó antes (no permitir reintentos si ya aprobó)
    const yaAprobo = await this.prisma.intentoEvaluacion.findFirst({
      where: { evaluacion_id, usuario_id, aprobado: true }
    });

    if (yaAprobo) {
      throw new BadRequestException('Ya aprobaste esta evaluación.');
    }

    // 4. Guardar el intento
    const intento = await this.prisma.intentoEvaluacion.create({
      data: createDto as any,
    });

    console.log(`Intento ${intentosPrevios + 1}/${maxIntentos} para usuario ${usuario_id}, evaluación ${evaluacion_id}, nota ${createDto.nota}`);

    let certificado: any = null;
    if (Number(createDto.nota) >= Number(evaluacion.nota_aprobacion)) {
      // 5. Emitir certificado automáticamente
      certificado = await this.certificadosService.issueCertificate(usuario_id, evaluacion.curso_id);
      console.log('Resultado de emisión:', certificado ? 'ÉXITO' : 'FALLO (posiblemente falta plantilla)');

      // 6. Marcar la inscripción como COMPLETADO
      try {
        await this.prisma.inscripcion.updateMany({
          where: { usuario_id, curso_id: evaluacion.curso_id },
          data: { estado: 'COMPLETADO', porcentaje_progreso: 100 }
        });
        console.log(`Inscripción marcada como COMPLETADO para usuario ${usuario_id}, curso ${evaluacion.curso_id}`);
      } catch (e) {
        console.error('Error al actualizar inscripción:', e.message);
      }
    } else {
      console.log('No alcanzó la nota de aprobación.');
    }

    return {
      ...intento,
      certificado,
      intentos_usados: intentosPrevios + 1,
      intentos_permitidos: maxIntentos,
    };
  }

  async findAll() {
    return this.prisma.intentoEvaluacion.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.intentoEvaluacion.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Registro no encontrado');
    return record;
  }

  async update(id: number, updateDto: UpdateIntentoEvaluacionDto) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.intentoEvaluacion.update({
      where: { id },
      data: updateDto as any,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.intentoEvaluacion.delete({
      where: { id },
    });
  }
}
