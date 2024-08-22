import { Module } from '@nestjs/common';
import { JwtConfigModule } from '../../framework/config/jwt';
import { BcryptModule } from '../../framework/config/bcrypt/bcrypt.module';
import { ModelsModule } from '../../framework/config/models/mongoose/models.module';
import { EntityMongooseRepository } from '../../framework/repositories/entity.repository';
import { UserService } from './users/users.service';
import { UserController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [ModelsModule, JwtConfigModule, BcryptModule],
  providers: [EntityMongooseRepository, UserService, AuthService],
  controllers: [AuthController, UserController],
})
export class PublicModule { }
