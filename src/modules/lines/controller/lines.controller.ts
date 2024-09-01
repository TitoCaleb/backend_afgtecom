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
import { LinesService } from '../service/lines.service';
import { Response } from 'express';
import { ApiResponseError } from 'src/errors/handleErrors';
import { Line } from 'src/domain/Line';
import { createLineSchema, updateBrandSchema } from './schema/lineSchema';
import { Brand } from 'src/domain/Brand';

@UseGuards(TokenGuard)
@Controller('lines')
export class LinesController {
  constructor(private linesService: LinesService) {}

  @Get()
  async findAll(
    @Res({ passthrough: true }) res: Response,
    @Query() { limit = 10, offset = 0 }: Query,
  ) {
    try {
      const response = await this.linesService.findAll();
      return {
        data: response.map((line) => line.getApiData()),
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

  @Get(':lineId')
  async findById(
    @Res({ passthrough: true }) res: Response,
    @Param('lineId') lineId: string,
  ) {
    try {
      const response = await this.linesService.findById(
        new Line({ id: lineId }),
      );
      return {
        data: response.getApiData(),
      };
    } catch (e: any) {
      res.status(HttpStatus.NOT_FOUND);
      return ApiResponseError(e, res);
    }
  }

  @Get(':brandId/brand')
  async findByBrandId(
    @Res({ passthrough: true }) res: Response,
    @Param('brandId') brandId: string,
  ) {
    try {
      const response = await this.linesService.findByBrandId(
        new Brand({ id: brandId }),
      );
      return {
        data: response.map((line) => line.getApiData()),
        /* pagination: {
          limit,
          offset,
        }, */
      };
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Post()
  async create(@Body() line: Line, @Res({ passthrough: true }) res: Response) {
    try {
      const request = await createLineSchema.parseAsync(line);
      const response = await this.linesService.create(new Line(request));
      res.status(HttpStatus.CREATED);
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Put(':lineId')
  async update(
    @Res({ passthrough: true }) res: Response,
    @Param('lineId') lineId: string,
    @Body() line: Line,
  ) {
    try {
      const request = await updateBrandSchema.parseAsync({
        id: lineId,
        ...line,
      });
      const response = await this.linesService.update(new Line(request));
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Delete(':lineId')
  async delete(
    @Res({ passthrough: true }) res: Response,
    @Param('lineId') lineId: string,
  ) {
    try {
      const response = await this.linesService.delete(new Line({ id: lineId }));
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }
}
