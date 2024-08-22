import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

type SalaryBaseDocument = SalaryBase & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
class SalaryBase extends Document {
  // Groupe in table "particulier"
  // Categorie in table "cadre"
  @Prop({
    required: true,
  })
  category: string;

  // Categorie in table "particulier"
  // Section in table "cadre"
  @Prop({
    enum: [1, 2, 'unique'],
    required: true,
  })
  section: number;

  // Indeice minmila in table "particulier"
  // Indice de base in table "cadre"
  @Prop({ required: true })
  basicIndex: number;

  // Anne on the top of table "particulier"
  // Anne on the top of table "cadre"
  @Prop({
    required: true,
  })
  year: number;

  // table values
  @Prop({
    required: true,
  })
  value: number;

  // does not exist in table "cadre"
  // Hors Category in table "particulier"
  @Prop({
    required: false,
  })
  outCategory: string;

  // type of the table
  @Prop({
    enum: ['cadre', 'pacticulier'],
    required: true,
  })
  type: string;

  // archive the data and do not show it to end users
  @Prop({ default: 0 })
  archived: number;
}

const SalaryBaseSchema = SchemaFactory.createForClass(SalaryBase);

export { SalaryBaseDocument, SalaryBase, SalaryBaseSchema };
