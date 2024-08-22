import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SalaryBaseSchema, UserSchema } from './index';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_URI as string, {}),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'SalaryBase', schema: SalaryBaseSchema },
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [MongooseModule],
})
export class ModelsModule {}
