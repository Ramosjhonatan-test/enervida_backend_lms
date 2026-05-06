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
}
