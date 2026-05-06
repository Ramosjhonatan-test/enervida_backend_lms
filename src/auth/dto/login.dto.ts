import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@enervida.com' })
  @IsEmail()
  correo: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @MinLength(6)
  contrasena: string;

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
