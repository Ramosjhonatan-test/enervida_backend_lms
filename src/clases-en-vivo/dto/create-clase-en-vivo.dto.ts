import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, IsDate } from 'class-validator';

export class CreateClaseEnVivoDto {
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

  @ApiProperty({ type: String })
  @IsString()
  sala_jitsi: string;

  @ApiProperty({ type: Date })
  @IsDate()
  fecha_inicio: Date;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  fecha_fin?: Date;

  @ApiProperty({ type: Number })
  @IsNumber()
  creado_por: number;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  fecha_creacion?: Date;


}
