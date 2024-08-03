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

@Controller('providers')
export class EmployeesController {
  constructor(private providerService: EmployeeService) {}

  @Get(':providerId/employees')
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

  @Post(':providerId/employees')
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

  @Delete(':providerId/employees/:employeeId')
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
  @Put(':providerId/employees/:employeeId')
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
}
