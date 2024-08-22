import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

type GradesDocument = Grades & Document;

@Schema({ _id: false })
class IndiceRow extends Document {
  value: number;
  year: string;
}

@Schema({ _id: false })
class internationalizedString extends Document {
  ar: string;
  fr: string;
}

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
class Grades extends Document {
  // type of the table can be one of the following  'Corps techeniques',
  // 'Ouvriers Professionnels, des Conducteurs d'Automobiles et des
  // Appariteurs' , 'Corps Techniques Spécifiques',
  // 'Corps techeniques', 'AGENT CONTRACTUELS' ....
  @Prop({
    required: true,
  })
  type: internationalizedString;

  // for example in table 'Corps Techniques Spécifiques'  we have section as 'Environnement'
  // and subsection as 'Corps Ingénieurs', for other tables we can ignore section
  @Prop({
    required: false,
  })
  section: internationalizedString;

  // for example in table 'Corps Techniques Spécifiques'  we have subsection
  // as 'Corps Ingénieurs'
  // and in table 'Corps techeniques' we have subsection as 'Corps
  // Ingénieurs de l’Habitat et de l’Urbanisme'
  @Prop({
    required: false,
  })
  subsection: internationalizedString;

  // for example in table 'Corps Techniques Spécifiques' , 16, 14, 13
  @Prop({
    required: false,
  })
  category: number;

  // for example: year: 2024,  value: 324,  year: 200,  value: 300
  @Prop({
    required: true,
  })
  index: IndiceRow;

  // for example Ouvrier Professionnel de Niveau 1, or Technicien Supérieur en l’Habitat et l’Urbanisme
  @Prop({
    required: true,
  })
  value: internationalizedString;
}

const GradesSchema = SchemaFactory.createForClass(Grades);

export { GradesDocument, Grades, GradesSchema };
