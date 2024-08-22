import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ example: '__refreshToken__' })
  @IsString()
  refreshToken: string;
}

export class RefreshTokenResponseDto {
  @ApiProperty({ example: '__accessToken__' })
  accessToken: string;

  @ApiProperty({ example: '__refreshToken__' })
  refreshToken: string;
}
