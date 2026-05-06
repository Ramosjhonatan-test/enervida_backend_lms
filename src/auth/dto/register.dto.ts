import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ type: String })
  @IsString()
  nombres: string;

  @ApiProperty({ type: String })
  @IsString()
  apellidos: string;

  @ApiProperty({ type: String })
  @IsEmail()
  correo: string;

  @ApiProperty({ type: String })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  contrasena_hash: string;
  
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  fingerprint?: string;

  @IsOptional()
  @IsString()
  nombre_dispositivo?: string;

  @IsOptional()
  @IsString()
  navegador?: string;

  @IsOptional()
  @IsString()
  sistema_operativo?: string;
}
