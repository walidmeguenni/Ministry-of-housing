import {
  Body,
  Controller,
  HttpStatus,
  Post,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SigninDto, SigninResponseDto } from './dto/signin.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  RefreshTokenDto,
  RefreshTokenResponseDto,
} from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully signed in.',
    type: SigninResponseDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async login(@Body(ValidationPipe) body: SigninDto, @Res() res: Response) {
    try {
      const login = await this.authService.login(body);
      if (!login) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          error: 'LOGIN_FORBIDDEN',
          message: 'Wrong Email or Password',
        });
      }
      return res.status(HttpStatus.OK).json({
        success: true,
        data: login,
      });
    } catch (err) {
      console.error(`error || AuthController::requestAccess | err: `, err);

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        succes: false,
        message: 'INTERNAL_SERVER_ERROR',
      });
    }
  }
  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 200,
    description: 'The access token has been successfully refreshed.',
    type: RefreshTokenResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async refreshToken(
    @Body(ValidationPipe) body: RefreshTokenDto,
    @Res() res: Response,
  ) {
    try {
      const refresh = await this.authService.refreshToken(body);

      return res.status(HttpStatus.OK).json({
        success: true,
        data: refresh,
      });
    } catch (err) {
      console.error(`error || AuthController::refreshToken | err: `, err);

      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'INVALID_REFRESH_TOKEN',
      });
    }
  }
}
