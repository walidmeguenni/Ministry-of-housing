import { Module } from '@nestjs/common';
import { PublicModule } from './public/public.module';
import { PrivateModule } from './private/private.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    PublicModule,
    PrivateModule,
    RouterModule.register([
      {
        path: '',
        children: [
          {
            path: '/',
            module: PublicModule,
          },
          {
            path: '/private',
            module: PrivateModule,
          },
        ],
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
