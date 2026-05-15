import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportesService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [totalCursos, totalEstudiantes, totalInscripciones, totalVentas, trend, activities, pendingInscriptions] = await Promise.all([
      this.prisma.curso.count(),
      this.prisma.usuario.count({ where: { rol: { nombre: 'estudiante' } } }),
      this.prisma.inscripcion.count(),
      this.prisma.curso.aggregate({ _sum: { precio: true } }),
      this.getTrendData(),
      this.getRecentActivities(),
      this.prisma.inscripcion.count({ where: { estado: 'PENDIENTE' } })
    ]);

    return {
      totalCursos,
      totalEstudiantes,
      totalInscripciones,
      totalVentas: totalVentas._sum.precio || 0,
      trend,
      activities,
      pendingInscriptions
    };
  }

  private async getTrendData() {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const inscripciones = await this.prisma.inscripcion.findMany({
      where: { fecha_inscripcion: { gte: sixMonthsAgo } },
      select: { fecha_inscripcion: true }
    });

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const trend = Array(6).fill(0).map((_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - i));
      const monthName = months[date.getMonth()];
      const count = inscripciones.filter(ins => 
        ins.fecha_inscripcion.getMonth() === date.getMonth() && 
        ins.fecha_inscripcion.getFullYear() === date.getFullYear()
      ).length;
      return { month: monthName, count };
    });

    return trend;
  }

  private async getRecentActivities() {
    const [lastInscripciones, lastUsuarios, lastCursos, lastCertificados, lastIntentos] = await Promise.all([
      this.prisma.inscripcion.findMany({
        take: 5,
        orderBy: { fecha_inscripcion: 'desc' },
        include: { 
          usuario: { select: { nombres: true, apellidos: true } },
          curso: { select: { titulo: true } }
        }
      }),
      this.prisma.usuario.findMany({
        take: 5,
        orderBy: { fecha_creacion: 'desc' },
        select: { nombres: true, apellidos: true, fecha_creacion: true, rol: { select: { nombre: true } } }
      }),
      this.prisma.curso.findMany({
        take: 3,
        orderBy: { fecha_creacion: 'desc' },
        select: { titulo: true, fecha_creacion: true }
      }),
      this.prisma.certificado.findMany({
        take: 3,
        orderBy: { fecha_emision: 'desc' },
        include: { 
          usuario: { select: { nombres: true } },
          curso: { select: { titulo: true } }
        }
      }),
      this.prisma.intentoEvaluacion.findMany({
        take: 3,
        where: { aprobado: true },
        orderBy: { fecha_fin: 'desc' },
        include: {
          usuario: { select: { nombres: true } },
          evaluacion: { include: { curso: { select: { titulo: true } } } }
        }
      })
    ]);

    const activities = [
      ...lastInscripciones.map(ins => ({
        type: 'INSCRIPCION',
        title: 'Nueva Inscripción',
        detail: `${ins.usuario.nombres} se inscribió en ${ins.curso.titulo}`,
        time: ins.fecha_inscripcion,
        icon: 'person_add',
        route: 'admin-solicitudes'
      })),
      ...lastUsuarios.map(user => ({
        type: 'REGISTRO',
        title: 'Nuevo Usuario',
        detail: `${user.nombres} ${user.apellidos} se unió como ${user.rol.nombre}`,
        time: user.fecha_creacion,
        icon: 'how_to_reg',
        route: 'admin-usuarios'
      })),
      ...lastCursos.map(curso => ({
        type: 'CURSO_NUEVO',
        title: 'Nuevo Curso',
        detail: `Se publicó el curso: ${curso.titulo}`,
        time: curso.fecha_creacion,
        icon: 'library_add',
        route: 'admin-cursos'
      })),
      ...lastCertificados.map(cert => ({
        type: 'CERTIFICADO',
        title: 'Certificado Emitido',
        detail: `${cert.usuario.nombres} completó ${cert.curso.titulo}`,
        time: cert.fecha_emision,
        icon: 'workspace_premium',
        route: 'admin-certificados'
      })),
      ...lastIntentos.map(intento => ({
        type: 'EVALUACION',
        title: 'Evaluación Aprobada',
        detail: `${intento.usuario.nombres} aprobó ${intento.evaluacion.titulo}`,
        time: intento.fecha_fin,
        icon: 'task_alt',
        route: 'admin-evaluaciones'
      }))
    ]
    .filter(a => a.time)
    .sort((a, b) => new Date(b.time!).getTime() - new Date(a.time!).getTime())
    .slice(0, 10);

    return activities;
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
