import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { BaseService } from '../service/base.service';
import { Response } from 'express';
import { ApiResponseError } from 'src/errors/handleErrors';
import { TokenGuard } from '../../security/guards';

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
}
