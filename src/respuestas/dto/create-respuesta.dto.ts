import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateRespuestaDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  pregunta_id: number;

  @ApiProperty({ type: String })
  @IsString()
  respuesta: string;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  es_correcta?: boolean;


}
