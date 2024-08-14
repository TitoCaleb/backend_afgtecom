import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { BaseService } from '../service/base.service';
import { Response } from 'express';
import { ApiResponseError } from 'src/errors/handleErrors';
import { TokenGuard } from '../../security/guards';
import { Department } from 'src/domain/Ubigeo/Department';
import { Province } from 'src/domain/Ubigeo/Province';

@UseGuards(TokenGuard)
@Controller('base')
export class BaseController {
  constructor(private baseService: BaseService) {}

  @Get('document_types')
  async findAllDocumentType(@Res({ passthrough: true }) res: Response) {
    try {
      const response = await this.baseService.findAllDocumentType();
      return {
        data: response,
      };
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }
  @Get('civil_status')
  async findAllCivilStatus(@Res({ passthrough: true }) res: Response) {
    try {
      const response = await this.baseService.findAllCivilStatus();
      return {
        data: response,
      };
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }
  @Get('profile')
  async findAllRol(@Res({ passthrough: true }) res: Response) {
    try {
      const response = await this.baseService.findAllRol();
      return {
        data: response,
      };
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Get('ubigeo/department')
  async findAllDepartment(@Res({ passthrough: true }) res: Response) {
    try {
      const response = await this.baseService.findAllDepartment();
      return {
        data: response,
      };
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Get('ubigeo/province/:departmentId')
  async findAllProvince(
    @Res({ passthrough: true }) res: Response,
    @Param('departmentId') departmentId: string,
  ) {
    try {
      const response = await this.baseService.findProvinceByDepartmentId(
        new Department({ id: departmentId }),
      );
      return {
        data: response.map((province) => province.getApiData()),
      };
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Get('ubigeo/district/:provinceId')
  async findAllDistrict(
    @Res({ passthrough: true }) res: Response,
    @Param('provinceId') provinceId: string,
  ) {
    try {
      const response = await this.baseService.findDistrictByProvinceId(
        new Province({ id: provinceId }),
      );
      return {
        data: response,
      };
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }
}
