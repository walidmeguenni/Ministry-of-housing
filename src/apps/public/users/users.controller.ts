import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { User } from '../../../framework/config/models/mongoose';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async create(
    @Body(ValidationPipe) body: CreateUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const user = await this.userService.create(body);

      if (!user) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Email or phone number already exists',
        });
      }

      return res.status(HttpStatus.CREATED).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error('Error in UserController::create', error);

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }
}
