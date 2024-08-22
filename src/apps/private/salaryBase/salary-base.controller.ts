import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { CreateSalaryBaseDto } from './dto/create-salary-base.dto';
import { SalaryService } from './salary-base.service';
import { Response } from 'express';
import { UpdateSalaryBaseDto } from './dto/update-salary-base.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SalaryBase } from '../../../framework/config/models/mongoose';

@ApiTags('Salary Base')
@Controller('salaryBase')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new SalaryBase record' })
  @ApiResponse({
    status: 201,
    description: 'The SalaryBase record has been successfully created.',
    type: SalaryBase,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Possibly due to invalid input data.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  async create(
    @Body(ValidationPipe) body: CreateSalaryBaseDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const salaryBase = await this.salaryService.create(body);
      return res.status(HttpStatus.CREATED).json({
        success: true,
        data: salaryBase,
      });
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a SalaryBase record by ID' })
  @ApiResponse({
    status: 200,
    description: 'The SalaryBase record was successfully retrieved.',
    type: SalaryBase,
  })
  @ApiResponse({
    status: 404,
    description: 'SalaryBase record not found for the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  async getById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const salaryBase = await this.salaryService.getById(id);
      return res.status(HttpStatus.OK).json({
        success: true,
        data: salaryBase,
      });
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all SalaryBase records' })
  @ApiResponse({
    status: 200,
    description: 'List of all SalaryBase records.',
    type: [SalaryBase],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  async getAll(@Query() query: any, @Res() res: Response): Promise<Response> {
    try {
      const salaryBases = await this.salaryService.getAll(query);
      return res.status(HttpStatus.OK).json({
        success: true,
        data: salaryBases,
      });
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a SalaryBase record by ID' })
  @ApiResponse({
    status: 200,
    description: 'The SalaryBase record has been successfully updated.',
    type: SalaryBase,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Possibly due to invalid input data.',
  })
  @ApiResponse({
    status: 404,
    description: 'SalaryBase record not found for the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) body: UpdateSalaryBaseDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const updatedSalaryBase = await this.salaryService.update(id, body);
      return res.status(HttpStatus.OK).json({
        success: true,
        data: updatedSalaryBase,
      });
    } catch (error) {
      throw error;
    }
  }
}
