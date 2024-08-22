import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtHelper } from '../../../framework/config/jwt';
import {
  SigninDto,
  SigninResponseDto,
  UserWithoutPasswordDto,
} from './dto/signin.dto';
import { BcryptHelper } from '../../../framework/config/bcrypt/bcrypt.helper';
import { JwtPayload } from '../../../framework/types/jwt-payload.interface';
import {
  RefreshTokenDto,
  RefreshTokenResponseDto,
} from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtHelper: JwtHelper,
    private readonly bcryptHelper: BcryptHelper,
  ) { }

  async login(signInDto: SigninDto): Promise<SigninResponseDto> {
    const { email, password } = signInDto;
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await this.bcryptHelper.compareBtw(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      userId: user._id as string,
      email: user.email,
    };

    const accessToken = this.jwtHelper.encodeToken(payload, {
      secret: process.env.JWT_SECRET,
    });

    const refreshToken = this.jwtHelper.encodeToken(payload, {
      secret: process.env.JWT_SECRET,
    });

    // Transform user to UserWithoutPasswordDto
    const userData: UserWithoutPasswordDto = {
      // userId: user._id,
      email: user.email,
      username: user.username,
      phoneNumber: user.phoneNumber,
      status: user.status,
    };

    return {
      accessToken,
      refreshToken,
      userData,
    };
  }

  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<RefreshTokenResponseDto> {
    const { refreshToken } = refreshTokenDto;
    try {
      const payload = this.jwtHelper.decodeToken(refreshToken, {
        secret: process.env.JWT_SECRET,
      }) as JwtPayload;

      const user = await this.userService.findUserByEmail(payload.email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const newPayload: JwtPayload = {
        userId: user._id as string,
        email: user.email,
      };

      const newAccessToken = this.jwtHelper.encodeToken(newPayload, {
        secret: process.env.JWT_SECRET,
      });

      const newRefreshToken = this.jwtHelper.encodeToken(newPayload, {
        secret: process.env.JWT_SECRET,
      });

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
