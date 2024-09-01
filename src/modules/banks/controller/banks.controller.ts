import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { BanksService } from '../service/banks.service';
import { Response } from 'express';
import { ApiResponseError } from 'src/errors/handleErrors';
import { Bank } from 'src/domain/Banks';
import { createBankSchema, updateBankSchema } from './schema/bankSchema';
import { TokenGuard } from 'src/modules/security/guards';

@UseGuards(TokenGuard)
@Controller('banks')
export class BanksController {
  constructor(private banksService: BanksService) {}

  @Get()
  async findAll(@Res({ passthrough: true }) res: Response) {
    try {
      const response = await this.banksService.findAll();
      return {
        data: response.map((bank) => bank.getApiData()),
      };
    } catch (e: any) {
      res.status(HttpStatus.NOT_FOUND);
      return ApiResponseError(e, res);
    }
  }

  @Get(':bankId')
  async findById(
    @Res({ passthrough: true }) res: Response,
    @Param('bankId') bankId: string,
  ) {
    try {
      const response = await this.banksService.findById(
        new Bank({
          id: bankId,
        }),
      );
      return {
        data: response.getApiData(),
      };
    } catch (e: any) {
      res.status(HttpStatus.NOT_FOUND);
      return ApiResponseError(e, res);
    }
  }

  @Post()
  async create(@Body() bank: Bank, @Res({ passthrough: true }) res: Response) {
    try {
      const request = await createBankSchema.parseAsync(bank);
      const response = await this.banksService.create(new Bank(request));
      res.status(HttpStatus.CREATED);
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Put(':bankId')
  async update(
    @Body() bank: Bank,
    @Res({ passthrough: true }) res: Response,
    @Param('bankId') bankId: string,
  ) {
    try {
      const request = await updateBankSchema.parseAsync({
        ...bank,
        id: bankId,
      });
      const response = await this.banksService.update(new Bank(request));
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Delete(':bankId')
  async delete(
    @Res({ passthrough: true }) res: Response,
    @Param('bankId') bankId: string,
  ) {
    try {
      const response = await this.banksService.delete(
        new Bank({
          id: bankId,
        }),
      );
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }
}
