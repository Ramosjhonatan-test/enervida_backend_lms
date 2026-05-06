import { PartialType } from '@nestjs/swagger';
import { CreateIntentoEvaluacionDto } from './create-intento-evaluacion.dto';

export class UpdateIntentoEvaluacionDto extends PartialType(CreateIntentoEvaluacionDto) {}
