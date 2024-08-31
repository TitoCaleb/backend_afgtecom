import { BankAccount } from 'src/domain/BankAccount';
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
import {
  createBankAccountSchema,
  updateBankAccountSchema,
} from './schema/providersSchema';
import { Response } from 'express';
import { ApiResponseError } from 'src/errors/handleErrors';
import { BankAccountService } from '../service/bankAccount.service';
import { Provider } from 'src/domain/Provider';
import { TokenGuard } from 'src/modules/security/guards';

@UseGuards(TokenGuard)
@Controller('bank-accounts')
export class BanksAccountController {
  constructor(private bankAccountService: BankAccountService) {}

  @Get(':providerId/provider')
  async findBankAccountByProviderId(
    @Res({ passthrough: true }) res: Response,
    @Param('providerId') providerId: string,
  ) {
    try {
      const response = await this.bankAccountService.findById(
        new Provider({ id: providerId }),
      );
      return {
        data: response.map((line) => line.getApiData()),
      };
    } catch (e: any) {
      res.status(HttpStatus.NOT_FOUND);
      return ApiResponseError(e, res);
    }
  }

  @Post(':providerId/provider')
  async createBankAccount(
    @Res({ passthrough: true }) res: Response,
    @Body() bankAccount: BankAccount,
    @Param('providerId') providerId: string,
  ) {
    try {
      const request = await createBankAccountSchema.parseAsync({
        ...bankAccount,
        provider: providerId,
      });
      const response = await this.bankAccountService.createBankAccount(
        new BankAccount(request),
      );
      res.status(HttpStatus.CREATED);
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Put(':bankAccountId')
  async updateBankAccount(
    @Res({ passthrough: true }) res: Response,
    @Body() bankAccount: BankAccount,
    @Param('bankAccountId') bankAccountId: string,
  ) {
    try {
      const request = await updateBankAccountSchema.parseAsync({
        id: bankAccountId,
        ...bankAccount,
      });
      const response = await this.bankAccountService.updateBankAccount(
        new BankAccount(request),
      );
      res.status(HttpStatus.CREATED);
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Delete(':bankAccountId')
  async deleteBankAccount(
    @Res({ passthrough: true }) res: Response,
    @Param('bankAccountId') bankAccountId: string,
  ) {
    try {
      const response = await this.bankAccountService.deleteBankAccount(
        new BankAccount({ id: bankAccountId }),
      );
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }
}
