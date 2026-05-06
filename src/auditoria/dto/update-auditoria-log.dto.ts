import { PartialType } from '@nestjs/swagger';
import { CreateAuditoriaLogDto } from './create-auditoria-log.dto';

export class UpdateAuditoriaLogDto extends PartialType(CreateAuditoriaLogDto) {}
