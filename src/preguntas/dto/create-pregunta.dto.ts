import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreatePreguntaDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  evaluacion_id: number;

  @ApiProperty({ type: String })
  @IsString()
  pregunta: string;

  @ApiProperty({ type: String })
  @IsString()
  tipo_pregunta: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  puntos?: number;


}
