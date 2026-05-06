import { PartialType } from '@nestjs/swagger';
import { CreateParticipanteClaseEnVivoDto } from './create-participante-clase-en-vivo.dto';

export class UpdateParticipanteClaseEnVivoDto extends PartialType(CreateParticipanteClaseEnVivoDto) {}
