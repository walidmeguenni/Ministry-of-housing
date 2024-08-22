import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtHelper } from './jwt-helper';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [],
  providers: [JwtHelper],
  exports: [JwtHelper],
})
export class JwtConfigModule {}
