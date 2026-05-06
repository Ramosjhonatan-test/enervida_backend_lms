import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, IsBoolean, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUsuarioDto {
  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  rol_id?: number;

  @ApiProperty({ type: String })
  @IsString()
  nombres: string;

  @ApiProperty({ type: String })
  @IsString()
  apellidos: string;

  @ApiProperty({ type: String })
  @IsString()
  correo: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  contrasena?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  ci?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  imagen_perfil?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  estado?: string;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  correo_verificado?: boolean;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  ultimo_login?: Date;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fecha_creacion?: Date;


}
