import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportesService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [totalCursos, totalEstudiantes, totalInscripciones, totalVentas] = await Promise.all([
      this.prisma.curso.count(),
      this.prisma.usuario.count({ where: { rol: { nombre: 'estudiante' } } }),
      this.prisma.inscripcion.count(),
      this.prisma.curso.aggregate({ _sum: { precio: true } }) // This is just an example, should be based on real payments
    ]);

    return {
      totalCursos,
      totalEstudiantes,
      totalInscripciones,
      totalVentas: totalVentas._sum.precio || 0
    };
  }

  async getEnrollmentsByCourse() {
    return this.prisma.curso.findMany({
      select: {
        titulo: true,
        _count: {
          select: { inscripciones: true }
        }
      },
      orderBy: {
        inscripciones: { _count: 'desc' }
      },
      take: 5
    });
  }
}
