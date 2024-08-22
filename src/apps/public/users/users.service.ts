import { BadRequestException, Injectable } from '@nestjs/common';
import { BcryptHelper } from '../../../framework/config/bcrypt/bcrypt.helper';
import { CreateUserDto } from './dtos/create-user.dto';
import { EntityMongooseRepository } from '../../../framework/repositories/entity.repository';
import { User } from '../../../framework/config/models/mongoose';
import { ConstantsSettings } from '../../../framework/config';

@Injectable()
export class UserService {
  constructor(
    private readonly entityMongooseRepository: EntityMongooseRepository,
    private readonly bcryptHelper: BcryptHelper,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, phoneNumber, password } = createUserDto;

    // Check if the user already exists by email or phoneNumber
    const existingUserByEmail = await this.entityMongooseRepository.loadEntity(
      ConstantsSettings.USER_COLLECTION,
      {
        filter: { email },
      },
    );

    const existingUserByPhoneNumber =
      await this.entityMongooseRepository.loadEntity(
        ConstantsSettings.USER_COLLECTION,
        {
          filter: { phoneNumber },
        },
      );

    if (existingUserByEmail || existingUserByPhoneNumber) {
      throw new BadRequestException('Email or phone number already exists');
    }

    // Hash the password
    const hashedPassword = await this.bcryptHelper.hashString(password);

    // Create and save the new user
    const newUser = {
      username,
      email,
      phoneNumber,
      password: hashedPassword,
      isActive: true,
    };

    const createdUser = await this.entityMongooseRepository.createEntity(
      ConstantsSettings.USER_COLLECTION,
      newUser,
    );

    return createdUser as User;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.entityMongooseRepository.loadEntity(
        ConstantsSettings.USER_COLLECTION,
        {
          filter: { email },
        },
      );

      return user;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new Error('Error finding user');
    }
  }
}
