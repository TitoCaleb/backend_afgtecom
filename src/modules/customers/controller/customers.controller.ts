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
import { CustomersService } from '../service/customers.service';
import { Customer, QueryCustomer } from 'src/domain/Customer';
import { Like } from 'typeorm';
import { Response } from 'express';
import { ApiResponseError } from 'src/errors/handleErrors';
import {
  createCustomerSchema,
  updateCustomerSchema,
} from './schema/customerSchema';

@UseGuards(TokenGuard)
@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  private dynamicQuery(query: QueryCustomer) {
    const where: any = {};
    if (query.name) {
      where.name = Like(`%${query.name}%`);
    }
    if (query.documentNumber) {
      where.documentNumber = Like(`%${query.documentNumber}%`);
    }
    if (query.limit) {
      where.limit = query.limit;
    }
    if (query.offset) {
      where.offset = query.offset;
    }
    return where;
  }

  @Get()
  async findAll(
    @Res({ passthrough: true }) res: Response,
    @Query() { limit, offset, documentNumber, name }: QueryCustomer,
  ) {
    try {
      const { response, total, pagination } =
        await this.customerService.findAll(
          this.dynamicQuery({
            documentNumber,
            name,
            limit,
            offset,
          }),
        );
      return {
        data: response.map((customer) => customer.getApiData()),
        pagination,
        total,
      };
    } catch (e: any) {
      res.status(HttpStatus.NOT_FOUND);
      return ApiResponseError(e, res);
    }
  }

  @Get(':customerId')
  async findById(
    @Res({ passthrough: true }) res: Response,
    @Param('customerId') customerId: string,
  ) {
    try {
      const response = await this.customerService.findById(
        new Customer({
          id: customerId,
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
  async create(
    @Body() customer: Customer,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const request = await createCustomerSchema.parseAsync(customer);
      const response = await this.customerService.create(new Customer(request));
      res.status(HttpStatus.CREATED);
      return response.getApiData();
    } catch (e: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return ApiResponseError(e, res);
    }
  }

  @Put(':customerId')
  async update(
    @Res({ passthrough: true }) res: Response,
    @Param('customerId') customerId: string,
    @Body() customer: Customer,
  ) {
    try {
      const request = await updateCustomerSchema.parseAsync({
        id: customerId,
        ...customer,
      });
      const response = await this.customerService.update(new Customer(request));
      res.status(HttpStatus.OK);
      return response.getApiData();
    } catch (e: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return ApiResponseError(e, res);
    }
  }

  @Delete(':customerId')
  async delete(
    @Res({ passthrough: true }) res: Response,
    @Param('customerId') customerId: string,
  ) {
    try {
      const response = await this.customerService.delete(
        new Customer({ id: customerId }),
      );
      res.status(HttpStatus.OK);
      return response.getApiData();
    } catch (e: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return ApiResponseError(e, res);
    }
  }
}
