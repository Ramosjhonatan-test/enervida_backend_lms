import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, IsDate } from 'class-validator';

export class CreateEvaluacionDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  curso_id: number;

  @ApiProperty({ type: String })
  @IsString()
  titulo: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  nota_aprobacion: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  tiempo_limite?: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  intentos_permitidos?: number;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  fecha_creacion?: Date;


}
