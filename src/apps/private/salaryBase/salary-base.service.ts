import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityMongooseRepository } from '../../../framework/repositories/entity.repository';
import { CreateSalaryBaseDto } from './dto/create-salary-base.dto';
import { SalaryBaseDocument } from '../../../framework/config/models/mongoose';
import { ConstantsSettings } from '../../../framework/config';
import { UpdateSalaryBaseDto } from './dto/update-salary-base.dto';

@Injectable()
export class SalaryService {
  constructor(
    private readonly entityMongooseRepository: EntityMongooseRepository,
  ) { }

  async create(
    createSalaryBaseDto: CreateSalaryBaseDto,
  ): Promise<SalaryBaseDocument> {
    const { category, section } = createSalaryBaseDto;
    // Check if the salary base record already exists for the same category and section
    const existingSalaryBase = await this.entityMongooseRepository.loadEntity(
      ConstantsSettings.SALARYBASE_COLLECTION,
      {
        filter: { category, section },
      },
    );

    if (existingSalaryBase) {
      throw new BadRequestException(
        'Salary base record for this category and section already exists',
      );
    }

    // Create and save the new salary base record
    const createdSalaryBase = await this.entityMongooseRepository.createEntity(
      ConstantsSettings.SALARYBASE_COLLECTION,
      createSalaryBaseDto,
    );

    return createdSalaryBase as SalaryBaseDocument;
  }

  async getById(id: string): Promise<SalaryBaseDocument> {
    try {
      const salaryBase = await this.entityMongooseRepository.loadEntity(
        ConstantsSettings.SALARYBASE_COLLECTION,
        {
          filter: { _id: id },
        },
      );

      if (!salaryBase) {
        throw new NotFoundException(
          `SalaryBase record with ID ${id} not found`,
        );
      }

      return salaryBase as SalaryBaseDocument;
    } catch (error) {
      console.error('Error in SalaryService::getById', error);
      throw error; // The global exception filter will handle this error
    }
  }

  async getAll(filter: any = {}): Promise<SalaryBaseDocument[]> {
    try {
      // Retrieve all salary base records based on the provided filter
      const salaryBases = await this.entityMongooseRepository.loadEntities(
        ConstantsSettings.SALARYBASE_COLLECTION,
        {
          filter: { ...filter, archived: 0 }, // Ensure archived records are excluded
        },
      );

      return salaryBases as SalaryBaseDocument[];
    } catch (error) {
      console.error('Error in SalaryService::getAll', error);
      throw error; // The global exception filter will handle this error
    }
  }

  async update(
    id: string,
    updateSalaryBaseDto: UpdateSalaryBaseDto,
  ): Promise<SalaryBaseDocument> {
    try {
      // Check if the salary base record exists
      const existingSalaryBase = await this.entityMongooseRepository.loadEntity(
        ConstantsSettings.SALARYBASE_COLLECTION,
        {
          filter: { _id: id },
        },
      );

      if (!existingSalaryBase) {
        throw new NotFoundException(
          `SalaryBase record with ID ${id} not found`,
        );
      }

      // Update the record
      const updatedSalaryBase =
        await this.entityMongooseRepository.findAndUpdateEntity(
          ConstantsSettings.SALARYBASE_COLLECTION,
          {
            filter: { _id: id },
            updates: updateSalaryBaseDto,
            options: { new: true },
          },
        );

      return updatedSalaryBase as SalaryBaseDocument;
    } catch (error) {
      console.error('Error in SalaryService::update', error);
      throw error; // The global exception filter will handle this error
    }
  }
}
