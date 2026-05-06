import { Module } from '@nestjs/common';
import { CertificadoPlantillasService } from './certificado-plantillas.service';
import { CertificadoPlantillasController } from './certificado-plantillas.controller';

@Module({
  controllers: [CertificadoPlantillasController],
  providers: [CertificadoPlantillasService],
})
export class CertificadoPlantillasModule {}
