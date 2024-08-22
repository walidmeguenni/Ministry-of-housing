import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

type TableTitleDocument = TableTitle & Document;

@Schema()
class TableTitle extends Document {
  // Table Title (e.g., "Dépenses de personnel")
  @Prop({ required: true })
  value: string;
}

const TableTitleSchema = SchemaFactory.createForClass(TableTitle);

export { TableTitleDocument, TableTitle, TableTitleSchema };

type CategoryDocument = Category & Document;

@Schema()
class Category extends Document {
  // Optional category field (e.g., "Fonctions Supérieures", "Fonctions Publiques")
  @Prop()
  value: string;
}

const CategorySchema = SchemaFactory.createForClass(Category);

export { CategoryDocument, Category, CategorySchema };

type DynamicTableDocument = DynamicTable & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
class DynamicTable extends Document {
  // Reference to the table title (e.g., "Dépenses de personnel")
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'TableTitle',
    required: true,
  })
  tableTitle: TableTitle;

  // Code for the table or entry (e.g., 11000, 11100)
  @Prop({ required: true })
  code: string;

  // Optional description
  @Prop()
  description: string;

  // Array of categories (e.g., "Fonctions Supérieures", "Fonctions Publiques")
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Category', default: [] })
  categories: Category[];

  // Notes for the decree (e.g., "Décret exécutif N° 07-306 29/09/2007")
  @Prop()
  notes: string;
}

const DynamicTableSchema = SchemaFactory.createForClass(DynamicTable);

export { DynamicTableDocument, DynamicTable, DynamicTableSchema };
