import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, IsBoolean, IsDate } from 'class-validator';

export class CreateCursoDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  categoria_id: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  instructor_id: number;

  @ApiProperty({ type: String })
  @IsString()
  titulo: string;

  @ApiProperty({ type: String })
  @IsString()
  slug: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  descripcion_corta?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  miniatura_url?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  nivel?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  tipo_curso?: string;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  certificado_habilitado?: boolean;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  publicado?: boolean;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  precio?: number;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  fecha_creacion?: Date;


}
