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
import { Response } from 'express';
import { ApiResponseError } from 'src/errors/handleErrors';
import { Provider } from 'src/domain/Provider';
import {
  createEmployeeSchema,
  deleteEmployeeSchema,
  updateEmployeeSchema,
} from './schema/employeeSchema';
import { Employee } from 'src/domain/Employee';
import { EmployeeService } from '../service/employees.service';
import { TokenGuard } from 'src/modules/security/guards';
import { Customer } from 'src/domain/Customer';

@UseGuards(TokenGuard)
@Controller('employees')
export class EmployeesController {
  constructor(private providerService: EmployeeService) {}

  // Providers
  @Get(':providerId/providers')
  async findEmployeesByProvider(
    @Res({ passthrough: true }) res: Response,
    @Param('providerId') providerId: string,
  ) {
    try {
      const response = await this.providerService.findAllEmployeesFromProvider(
        new Provider({
          id: providerId,
        }),
      );
      return {
        data: response.map((employee) => employee.getApiData()),
      };
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Post(':providerId/providers')
  async addEmployeeToProvider(
    @Res({ passthrough: true }) res: Response,
    @Param('providerId') providerId: string,
    @Body() employee: Employee,
  ) {
    try {
      const request = await createEmployeeSchema.parseAsync({
        ...employee,
        provider: providerId,
      });
      const response = await this.providerService.addEmployeeToProvider(
        new Employee(request),
      );
      res.status(HttpStatus.CREATED);
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Put(':employeeId/providers/:providerId')
  async updateEmployeeFromProvider(
    @Res({ passthrough: true }) res: Response,
    @Param('providerId') providerId: string,
    @Param('employeeId') employeeId: string,
    @Body() employee: Employee,
  ) {
    try {
      const request = await updateEmployeeSchema.parseAsync({
        ...employee,
        id: employeeId,
      });
      const response = await this.providerService.updateEmployeeFromProvider(
        new Employee({
          ...request,
          provider: new Provider({ id: providerId }),
        }),
      );
      res.status(HttpStatus.OK);
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Delete(':employeeId/providers/:providerId')
  async removeEmployeeFromProvider(
    @Res({ passthrough: true }) res: Response,
    @Param('providerId') providerId: string,
    @Param('employeeId') employeeId: string,
  ) {
    try {
      const request = await deleteEmployeeSchema.parseAsync({
        id: employeeId,
        provider: providerId,
      });
      const response = await this.providerService.removeEmployeeFromProvider(
        new Employee(request),
      );
      res.status(HttpStatus.OK);
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  // Customers
  @Get(':customerId/customers')
  async findEmployeesByCustomer(
    @Res({ passthrough: true }) res: Response,
    @Param('customerId') customerId: string,
  ) {
    try {
      const response = await this.providerService.findAllEmployeesFromCustomers(
        new Customer({
          id: customerId,
        }),
      );
      return {
        data: response.map((employee) => employee.getApiData()),
      };
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Post(':customerId/customers')
  async addEmployeeToCustomer(
    @Res({ passthrough: true }) res: Response,
    @Param('customerId') customerId: string,
    @Body() employee: Employee,
  ) {
    try {
      const request = await createEmployeeSchema.parseAsync({
        ...employee,
        customer: customerId,
      });
      const response = await this.providerService.addEmployeeToCustomer(
        new Employee(request),
      );
      res.status(HttpStatus.CREATED);
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Put(':employeeId/customers/:customerId')
  async updateEmployeeFromCustomer(
    @Res({ passthrough: true }) res: Response,
    @Param('customerId') customerId: string,
    @Param('employeeId') employeeId: string,
    @Body() employee: Employee,
  ) {
    try {
      const request = await updateEmployeeSchema.parseAsync({
        id: employeeId,
        ...employee,
      });
      const response = await this.providerService.updateEmployeeFromCustomer(
        new Employee({
          ...request,
          customer: new Customer({ id: customerId }),
        }),
      );
      res.status(HttpStatus.OK);
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Delete(':employeeId/customers/:customerId')
  async removeEmployeeFromCustomer(
    @Res({ passthrough: true }) res: Response,
    @Param('customerId') customerId: string,
    @Param('employeeId') employeeId: string,
  ) {
    try {
      const request = await deleteEmployeeSchema.parseAsync({
        id: employeeId,
        customer: customerId,
      });
      const response = await this.providerService.removeEmployeeFromCustomer(
        new Employee(request),
      );
      res.status(HttpStatus.OK);
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }
}
