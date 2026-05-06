import { Module } from '@nestjs/common';
import { IntentoEvaluacionsService } from './intentos-evaluacion.service';
import { IntentoEvaluacionsController } from './intentos-evaluacion.controller';
import { CertificadosModule } from '../certificados/certificados.module';

@Module({
  imports: [CertificadosModule],
  controllers: [IntentoEvaluacionsController],
  providers: [IntentoEvaluacionsService],
})
export class IntentoEvaluacionsModule {}
