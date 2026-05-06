import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsBoolean, IsDate } from 'class-validator';

export class CreateProgresoLeccionDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  usuario_id: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  leccion_id: number;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  completado?: boolean;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  fecha_completado?: Date;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  segundos_vistos?: number;


}
