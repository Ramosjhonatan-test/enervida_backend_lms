import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, IsBoolean, IsDate } from 'class-validator';

export class CreateLeccionDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  modulo_id: number;

  @ApiProperty({ type: String })
  @IsString()
  titulo: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  orden_leccion: number;

  @ApiProperty({ type: String })
  @IsString()
  tipo_contenido: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  video_url?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  pdf_url?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  contenido?: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  duracion_minutos?: number;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  es_preview?: boolean;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  fecha_creacion?: Date;


}
