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
import { TokenGuard } from 'src/modules/security/guards';
import { BusinessSectorService } from '../service/business-sector.service';
import { Response } from 'express';
import { ApiResponseError } from 'src/errors/handleErrors';
import { BusinessSector } from 'src/domain/BusinessSector';
import {
  createBusinessSectorSchema,
  updateBusinessSectorSchema,
} from './schema/businessSectorSchema';

@UseGuards(TokenGuard)
@Controller('business-sector')
export class BusinessSectorController {
  constructor(private businessSectorService: BusinessSectorService) {}

  @Get()
  async findAll(@Res({ passthrough: true }) res: Response) {
    try {
      const response = await this.businessSectorService.findAll();
      return {
        data: response.map((sector) => sector.getApiData()),
      };
    } catch (e: any) {
      res.status(HttpStatus.NOT_FOUND);
      return ApiResponseError(e, res);
    }
  }

  @Get(':sectorId')
  async findById(
    @Res({ passthrough: true }) res: Response,
    @Param('sectorId') sectorId: string,
  ) {
    try {
      const response = await this.businessSectorService.findById(
        new BusinessSector({
          id: sectorId,
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
    @Res({ passthrough: true }) res: Response,
    @Body() sector: BusinessSector,
  ) {
    try {
      const request = await createBusinessSectorSchema.parseAsync(sector);
      const response = await this.businessSectorService.create(
        new BusinessSector(request),
      );
      return response.getApiData();
    } catch (e: any) {
      res.status(HttpStatus.NOT_FOUND);
      return ApiResponseError(e, res);
    }
  }

  @Put(':sectorId')
  async update(
    @Res({ passthrough: true }) res: Response,
    @Param('sectorId') sectorId: string,
    @Body() sector: BusinessSector,
  ) {
    try {
      const request = await updateBusinessSectorSchema.parseAsync({
        id: sectorId,
        ...sector,
      });
      const response = await this.businessSectorService.update(
        new BusinessSector(request),
      );
      return response.getApiData();
    } catch (e: any) {
      res.status(HttpStatus.NOT_FOUND);
      return ApiResponseError(e, res);
    }
  }

  @Delete(':sectorId')
  async delete(
    @Res({ passthrough: true }) res: Response,
    @Param('sectorId') sectorId: string,
  ) {
    try {
      const response = await this.businessSectorService.delete(
        new BusinessSector({
          id: sectorId,
        }),
      );
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }
}
