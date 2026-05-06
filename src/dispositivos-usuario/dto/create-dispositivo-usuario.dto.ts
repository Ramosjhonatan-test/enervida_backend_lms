import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsBoolean, IsDate } from 'class-validator';

export class CreateDispositivoUsuarioDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  usuario_id: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  nombre_dispositivo?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  sistema_operativo?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  navegador?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  fingerprint?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  direccion_ip?: string;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  ultimo_acceso?: Date;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  fecha_creacion?: Date;


}
