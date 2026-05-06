import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @ApiProperty({ description: 'ID del usuario' })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'Refresh Token' })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
