import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ConstantsSettings } from '../../constants';

type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
class User extends Document {
  @Prop({ required: true, match: ConstantsSettings.REG_EXP_EMAIL })
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: false })
  fullname: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    enum: ConstantsSettings.TYPE_USER_LIST,
    default: ConstantsSettings.TYPE_USER_DEFAULT,
  })
  type: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({
    enum: ConstantsSettings.ENTITY_STATUS_LIST,
    default: ConstantsSettings.ENTITY_STATUS_DEFAULT,
  })
  status: string;

  @Prop({ default: 0 })
  archived: number;

  // You may include other properties if needed
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1, archived: 1 }, { unique: true });
UserSchema.index({ username: 1, archived: 1 }, { unique: true });

export { UserDocument, User, UserSchema };
