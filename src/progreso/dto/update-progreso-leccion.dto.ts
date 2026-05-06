import { PartialType } from '@nestjs/swagger';
import { CreateProgresoLeccionDto } from './create-progreso-leccion.dto';

export class UpdateProgresoLeccionDto extends PartialType(CreateProgresoLeccionDto) {}
