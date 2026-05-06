import { PartialType } from '@nestjs/swagger';
import { CreateLeccionDto } from './create-leccion.dto';

export class UpdateLeccionDto extends PartialType(CreateLeccionDto) {}
