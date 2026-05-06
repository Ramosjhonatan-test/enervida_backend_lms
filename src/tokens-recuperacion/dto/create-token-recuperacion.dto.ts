import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate, IsOptional, IsBoolean } from 'class-validator';

export class CreateTokenRecuperacionDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  usuario_id: number;

  @ApiProperty({ type: String })
  @IsString()
  token: string;

  @ApiProperty({ type: Date })
  @IsDate()
  expira_en: Date;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  usado?: boolean;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  fecha_creacion?: Date;


}
