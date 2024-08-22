import { PartialType } from '@nestjs/mapped-types';
import { CreateSalaryBaseDto } from './create-salary-base.dto';

export class UpdateSalaryBaseDto extends PartialType(CreateSalaryBaseDto) {}
