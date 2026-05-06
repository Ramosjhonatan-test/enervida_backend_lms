import { PartialType } from '@nestjs/swagger';
import { CreateClaseEnVivoDto } from './create-clase-en-vivo.dto';

export class UpdateClaseEnVivoDto extends PartialType(CreateClaseEnVivoDto) {}
