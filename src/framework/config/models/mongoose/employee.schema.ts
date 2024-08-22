import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

type EmployeeDocument = Employee & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
class Employee extends Document {
  // Nom_arabic
  @Prop({ required: true })
  nameArabic: string;

  // Nom_latin
  @Prop({ required: true })
  nameLatin: string;

  // Prenom_arabic
  @Prop({ required: true })
  firstNameArabic: string;

  // Prenom_latin
  @Prop({ required: true })
  firstNameLatin: string;

  // Adress
  @Prop({ required: true })
  address: string;

  // ResiAdminstrative
  @Prop({ required: true })
  administrativeResidence: string;

  // Birthday
  @Prop({ required: true })
  birthday: Date;

  // Place of birth
  @Prop({ required: true })
  placeOfBirth: string;

  // Date de recrutment
  @Prop({ required: true })
  recruitmentDate: Date;

  // Nom/Prenom pere
  @Prop({ required: true })
  fatherName: string;

  // Nom/Prenom mere
  @Prop({ required: true })
  motherName: string;

  // Nin
  @Prop({ required: true })
  nationalIdentityNumber: string;

  // Banque(mode_des_payments)
  @Prop({ required: true })
  bank: string;

  // Numero de compte
  @Prop({ required: true })
  accountNumber: string;

  // RIP/RIB
  @Prop({ required: true })
  ripRib: string;

  // Situation Familial
  @Prop({ required: true })
  maritalStatus: string;

  // Nombre d’enfant
  @Prop({ required: true })
  numberOfChildren: number;

  // Nombre d’enfant_scolair
  @Prop({ required: true })
  numberOfSchoolChildren: number;

  // +10ans
  @Prop({ required: true })
  overTenYearsOld: boolean;

  // Femme Au Foyer(Travailler ou pas)
  @Prop({ required: true })
  isHousewifeWorking: boolean;

  // Numéro sécurité social
  @Prop({ required: true })
  socialSecurityNumber: string;

  // Numéro Mutuelle
  @Prop({ required: true })
  mutualNumber: string;

  // Gender
  @Prop({ required: true })
  gender: string;

  // filière
  @Prop({ required: true })
  fieldOfStudy: string;

  // Corp
  @Prop({ required: true })
  body: string;

  // Catégorie
  @Prop({ required: true })
  category: string;

  // Numéro D’échelon
  @Prop({ required: true })
  echelonNumber: string;

  // Niveau Posts Superieur
  @Prop({ required: true })
  higherPostLevel: string;

  // Post Superier
  @Prop({ required: true })
  higherPost: string;

  // position situation
  @Prop({ required: true })
  positionSituation: string;

  // Archived (for data visibility)
  @Prop({ default: 0 })
  archived: number;
}

const EmployeeSchema = SchemaFactory.createForClass(Employee);

export { EmployeeDocument, Employee, EmployeeSchema };
