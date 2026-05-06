import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, IsDate } from 'class-validator';

export class CreateCertificadoDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  usuario_id: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  curso_id: number;

  @ApiProperty({ type: String })
  @IsString()
  codigo_certificado: string;

  @ApiProperty({ type: String })
  @IsString()
  pdf_url: string;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  fecha_emision?: Date;


}
