import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

type IrgDocument = Irg & Document;

@Schema({ _id: false })
class IrgSalaryRow extends Document {
  irg: number;
  netSalary: number;
}

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
class Irg extends Document {
  // Salaire imposable in table
  @Prop({
    required: true,
  })
  imposableSalary: number;

  // Section in table "IRG (regime generale)"
  @Prop({
    required: true,
  })
  general: IrgSalaryRow;

  // Section in table "IRG (cas particuliers)"
  @Prop({
    required: true,
  })
  particular: IrgSalaryRow;
}

const IrgSchema = SchemaFactory.createForClass(Irg);

export { IrgDocument, Irg, IrgSchema };
