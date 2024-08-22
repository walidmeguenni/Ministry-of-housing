import { InjectModel } from '@nestjs/mongoose';
import {
  SalaryBase,
  SalaryBaseDocument,
  User,
  UserDocument,
} from '../config/models/mongoose';
import { Model } from 'mongoose';
import { ConstantsSettings } from '../config';

export class EntityMongooseRepository {
  private modelMap: Record<string, Model<any>>;

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(SalaryBase.name)
    private salaryBaseModel: Model<SalaryBaseDocument>,
  ) {
    this.modelMap = {
      [ConstantsSettings.USER_COLLECTION]: this.userModel,
      [ConstantsSettings.SALARYBASE_COLLECTION]: this.salaryBaseModel,
    };
  }

  private getModel(collection: string): Model<any> {
    const model = this.modelMap[collection];
    if (!model) {
      throw new Error(`Model for collection '${collection}' not found`);
    }
    return model;
  }

  private async handleOperation(
    operation: Promise<any>,
    collection: string,
  ): Promise<any> {
    try {
      return await operation;
    } catch (error) {
      console.log(`Error in collection '${collection}':`, error);
      return false;
    }
  }

  async loadEntity(collection: string, data: any = {}) {
    const { filter = {}, projection = {}, options = {} } = data;
    return this.handleOperation(
      this.getModel(collection).findOne(
        { ...filter, archived: 0 },
        projection,
        options,
      ),
      collection,
    );
  }

  async createEntity(collection: string, data: any = {}) {
    return this.handleOperation(
      this.getModel(collection).create(data),
      collection,
    );
  }

  async findAndUpdateEntity(collection: string, data: any = {}) {
    const { filter = {}, updates = {}, options = {} } = data;
    return this.handleOperation(
      this.getModel(collection)
        .findOneAndUpdate({ ...filter, archived: 0 }, updates, options)
        .lean(),
      collection,
    );
  }

  async saveEntity(data: any = {}) {
    try {
      const { existingEntity } = data;
      await existingEntity.save();
      return existingEntity;
    } catch (error) {
      console.log('Error saving entity:', error);
      return false;
    }
  }
  async loadEntities(collection: string, data: any = {}) {
    const { filter = {}, options = {}, projection = {} } = data;
    try {
      return await this.getModel(collection)
        .find(
          {
            ...filter,
            archived: 0,
          },
          {
            ...projection,
          },
          {
            ...options,
          },
        )
        .lean();
    } catch (error) {
      console.error(
        'error | Helper:EntityMongooseRepository:loadEntities | err => ',
        collection,
        error,
      );
      return false;
    }
  }
}
