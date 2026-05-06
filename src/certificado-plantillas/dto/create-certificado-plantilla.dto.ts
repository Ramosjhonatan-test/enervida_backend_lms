import { IsInt, IsNotEmpty, IsObject, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCertificadoPlantillaDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  curso_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  background_url: string;

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  config: any; // { student: {x, y, size, color}, course: {x, y, size, color}, date: {x, y, size, color} }
}
