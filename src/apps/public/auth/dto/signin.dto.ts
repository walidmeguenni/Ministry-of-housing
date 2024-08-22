import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { User } from '../../../../framework/config/models/mongoose';

export class SigninDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  password: string;

  //   @ApiProperty({ example: 'ADMIN', enum: ROLES })
  //   @IsEnum(ROLES)
  //   role: ROLES
}

export class UserWithoutPasswordDto {
  // @ApiProperty({ example: '1' })
  // @IsString()
  // userId: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  username: string;

  @ApiProperty({ example: '+213555789632' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 'ACTIVE' })
  @IsString()
  status: string;

  // @ApiProperty({ example: '2024-07-22T00:00:00Z' })
  // @IsDate()
  // created_at: Date;

  // @ApiProperty({ example: '2024-07-22T00:00:00Z' })
  // @IsDate()
  // updated_at: Date;
}

export class SigninResponseDto {
  @ApiProperty({ example: '__accessToken__' })
  accessToken: string;

  @ApiProperty({ example: '__refreshToken__' })
  refreshToken: string;

  @ApiProperty({ type: () => User })
  userData: UserWithoutPasswordDto;
}
