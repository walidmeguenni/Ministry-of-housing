import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

type BonificationsDocument = Bonifications & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
class Bonifications extends Document {
  levels: number;
  value: number;
}

const BonificationsSchema = SchemaFactory.createForClass(Bonifications);

export { Bonifications, BonificationsDocument, BonificationsSchema };
