import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Nombre del rol' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Administrador del sistema', description: 'Descripción opcional', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;
}
