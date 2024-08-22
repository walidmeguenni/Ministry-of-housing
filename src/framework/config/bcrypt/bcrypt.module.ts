import { Module } from '@nestjs/common';
import { BcryptHelper } from './bcrypt.helper';
@Module({
  imports: [],
  providers: [BcryptHelper],
  exports: [BcryptHelper],
})
export class BcryptModule {}
