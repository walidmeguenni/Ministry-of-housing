import { Module } from '@nestjs/common';
import { ModelsModule } from '../config/models/mongoose';
import { EntityMongooseRepository } from './entity.repository';

@Module({
  imports: [ModelsModule],
  controllers: [],
  providers: [EntityMongooseRepository],
  exports: [EntityMongooseRepository],
})
export class RepositoryMongooseModule {}
