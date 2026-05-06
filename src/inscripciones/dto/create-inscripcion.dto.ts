import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsDate } from 'class-validator';

export class CreateInscripcionDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  usuario_id: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  curso_id: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  estado?: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  porcentaje_progreso?: number;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  fecha_inscripcion?: Date;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  fecha_completado?: Date;


}
