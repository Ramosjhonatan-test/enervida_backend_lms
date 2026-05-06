import { PartialType } from '@nestjs/swagger';
import { CreateCertificadoPlantillaDto } from './create-certificado-plantilla.dto';

export class UpdateCertificadoPlantillaDto extends PartialType(CreateCertificadoPlantillaDto) {}
