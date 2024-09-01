import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TokenGuard } from 'src/modules/security/guards';
import { PaymentTermService } from '../service/paymentTerm.service';
import { Response } from 'express';
import { ApiResponseError } from 'src/errors/handleErrors';
import { PaymentTerm } from 'src/domain/PaymentTerm';
import {
  createPaymentTermSchema,
  updatePaymentTermSchema,
} from './schema/paymentTermSchema';

@UseGuards(TokenGuard)
@Controller('payment-term')
export class PaymentTermController {
  constructor(private paymentTermService: PaymentTermService) {}

  @Get()
  async findAll(
    @Res({ passthrough: true }) res: Response,
    @Query() { limit = 10, offset = 0 }: Query,
  ) {
    try {
      const response = await this.paymentTermService.findAll();
      return {
        data: response.map((paymentTerm) => paymentTerm.getApiData()),
        pagination: {
          limit,
          offset,
        },
      };
    } catch (e: any) {
      res.status(HttpStatus.NOT_FOUND);
      return ApiResponseError(e, res);
    }
  }

  @Get(':paymentTermId')
  async findById(
    @Res({ passthrough: true }) res: Response,
    @Param('paymentTermId') paymentTermId: string,
  ) {
    try {
      const response = await this.paymentTermService.findById(
        new PaymentTerm({ id: paymentTermId }),
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
  async create(
    @Body() paymentTerm: PaymentTerm,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const request = await createPaymentTermSchema.parseAsync(paymentTerm);
      const response = await this.paymentTermService.create(
        new PaymentTerm(request),
      );
      res.status(HttpStatus.CREATED);
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Put(':paymentTermId')
  async update(
    @Res({ passthrough: true }) res: Response,
    @Param('paymentTermId') paymentTermId: string,
    @Body() paymentTerm: PaymentTerm,
  ) {
    try {
      const request = await updatePaymentTermSchema.parseAsync({
        id: paymentTermId,
        ...paymentTerm,
      });
      const response = await this.paymentTermService.update(
        new PaymentTerm(request),
      );
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Delete(':paymentTermId')
  async delete(
    @Res({ passthrough: true }) res: Response,
    @Param('paymentTermId') paymentTermId: string,
  ) {
    try {
      const response = await this.paymentTermService.delete(
        new PaymentTerm({ id: paymentTermId }),
      );
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }
}
