import { Controller, Get } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('reportes')
@Controller('reportes')
export class ReportesController {
  constructor(private readonly service: ReportesService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Estadísticas generales para el dashboard' })
  getDashboardStats() {
    return this.service.getDashboardStats();
  }

  @Get('inscripciones-por-curso')
  @ApiOperation({ summary: 'Inscripciones por curso (top 5)' })
  getEnrollmentsByCourse() {
    return this.service.getEnrollmentsByCourse();
  }

  @Get('inscripciones-por-estado')
  @ApiOperation({ summary: 'Distribución de inscripciones por estado' })
  getInscriptionsByStatus() {
    return this.service.getInscriptionsByStatus();
  }

  @Get('usuarios-por-mes')
  @ApiOperation({ summary: 'Registro de usuarios por mes (últimos 6)' })
  getUsersByMonth() {
    return this.service.getUsersByMonth();
  }

  @Get('cursos-por-categoria')
  @ApiOperation({ summary: 'Cantidad de cursos por categoría' })
  getCoursesByCategory() {
    return this.service.getCoursesByCategory();
  }

  @Get('certificados-por-mes')
  @ApiOperation({ summary: 'Certificados emitidos por mes (últimos 6)' })
  getCertificatesByMonth() {
    return this.service.getCertificatesByMonth();
  }

  @Get('evaluaciones-resultados')
  @ApiOperation({ summary: 'Proporción de evaluaciones aprobadas vs reprobadas' })
  getEvaluationResults() {
    return this.service.getEvaluationResults();
  }
}
