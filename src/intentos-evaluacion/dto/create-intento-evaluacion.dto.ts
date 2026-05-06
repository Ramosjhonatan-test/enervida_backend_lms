import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsDate, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateIntentoEvaluacionDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  evaluacion_id: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  usuario_id: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  nota?: number;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @Type(() => Date)
  fecha_inicio?: Date;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @Type(() => Date)
  fecha_fin?: Date;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  aprobado?: boolean;


}
