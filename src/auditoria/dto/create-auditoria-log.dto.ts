import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString, IsDate } from 'class-validator';

export class CreateAuditoriaLogDto {
  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  usuario_id?: number;

  @ApiProperty({ type: String })
  @IsString()
  accion: string;

  @ApiProperty({ type: String })
  @IsString()
  entidad: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  entidad_id?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  valores_anteriores?: any;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  valores_nuevos?: any;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  direccion_ip?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  user_agent?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  metodo_request?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  endpoint?: string;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  fecha_creacion?: Date;


}
