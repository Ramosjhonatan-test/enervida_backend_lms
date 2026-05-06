import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsDate, IsOptional } from 'class-validator';

export class CreateParticipanteClaseEnVivoDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  clase_en_vivo_id: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  usuario_id: number;

  @ApiProperty({ type: Date })
  @IsDate()
  hora_ingreso: Date;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  hora_salida?: Date;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  minutos_asistencia?: number;


}
