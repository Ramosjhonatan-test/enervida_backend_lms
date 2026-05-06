import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, IsDate } from 'class-validator';

export class CreateModuloDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  curso_id: number;

  @ApiProperty({ type: String })
  @IsString()
  titulo: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  orden_modulo: number;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  fecha_creacion?: Date;


}
