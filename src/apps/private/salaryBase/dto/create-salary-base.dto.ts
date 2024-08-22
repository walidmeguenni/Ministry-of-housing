import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsEnum, IsString } from 'class-validator';

export class CreateSalaryBaseDto {
  @ApiProperty({
    example: 'Group A',
    description: 'Groupe in table "particulier", Categorie in table "cadre"',
  })
  @IsString()
  category: string;

  @ApiProperty({
    example: 1,
    description: 'Categorie in table "particulier", Section in table "cadre"',
    enum: [1, 2, 'unique'],
  })
  @IsEnum(['1', '2', 'unique'])
  section: string;

  @ApiProperty({
    example: 100,
    description:
      'Indeice minmila in table "particulier", Indice de base in table "cadre"',
  })
  @IsNumber()
  basicIndex: number;

  @ApiProperty({
    example: 2023,
    description:
      ' Anne on the top of table "particulier", Anne on the top of table "cadre"',
  })
  @IsNumber()
  year: number;

  @ApiProperty({ example: 5000, description: 'The value of the salary base.' })
  @IsNumber()
  value: number;

  @ApiProperty({
    example: 'Out of Category',
    description:
      'Does not exist in table "cadre",  Hors Category in table "particulier"',
    required: false,
  })
  @IsOptional()
  @IsString()
  outCategory?: string;

  @ApiProperty({
    example: 'cadre',
    description: 'The type of the salary base.',
    enum: ['cadre', 'particulier'],
  })
  @IsEnum(['cadre', 'particulier'])
  type: string;

  @ApiProperty({
    example: 0,
    description: 'The archived status of the salary base.',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  archived?: number;
}
