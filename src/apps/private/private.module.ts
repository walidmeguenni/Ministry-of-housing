// src/apps/private/private.module.ts
import { Module } from '@nestjs/common';
import { ModelsModule } from '../../framework/config/models/mongoose/models.module';
import { EntityMongooseRepository } from '../../framework/repositories/entity.repository';
import { SalaryService } from './salaryBase/salary-base.service';
import { SalaryController } from './salaryBase/salary-base.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ModelsModule],
  providers: [EntityMongooseRepository, SalaryService],
  controllers: [SalaryController],
})
export class PrivateModule { }
