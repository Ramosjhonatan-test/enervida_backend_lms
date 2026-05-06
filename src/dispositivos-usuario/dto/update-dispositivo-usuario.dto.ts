import { PartialType } from '@nestjs/swagger';
import { CreateDispositivoUsuarioDto } from './create-dispositivo-usuario.dto';

export class UpdateDispositivoUsuarioDto extends PartialType(CreateDispositivoUsuarioDto) {}
