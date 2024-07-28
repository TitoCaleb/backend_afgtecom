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
import { BrandsService } from '../service/brands.service';
import { Response } from 'express';
import { ApiResponseError } from 'src/errors/handleErrors';
import { Brand } from 'src/domain/Brand';
import { createBrandSchema, updateBrandSchema } from './schema/brandSchema';

@UseGuards(TokenGuard)
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  async findAll(
    @Res({ passthrough: true }) res: Response,
    @Query() { limit = 10, offset = 0 }: Query,
  ) {
    try {
      const response = await this.brandsService.findAll();
      return {
        data: response.map((user) => user.getApiData()),
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

  @Get(':brandId')
  async findById(
    @Res({ passthrough: true }) res: Response,
    @Param('brandId') brandId: string,
  ) {
    try {
      const response = await this.brandsService.findById(
        new Brand({
          id: brandId,
        }),
      );
      return response.getApiData();
    } catch (e: any) {
      res.status(HttpStatus.NOT_FOUND);
      return ApiResponseError(e, res);
    }
  }

  @Post()
  async create(@Body() user: Brand, @Res({ passthrough: true }) res: Response) {
    try {
      const request = await createBrandSchema.parseAsync(user);
      const response = await this.brandsService.create(new Brand(request));
      res.status(HttpStatus.CREATED);
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Put(':brandId')
  async update(
    @Res({ passthrough: true }) res: Response,
    @Param('brandId') brandId: string,
    @Body() brand: Brand,
  ) {
    try {
      const request = await updateBrandSchema.parseAsync({
        id: brandId,
        ...brand,
      });
      const response = await this.brandsService.update(new Brand(request));
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Delete(':brandId')
  async delete(
    @Res({ passthrough: true }) res: Response,
    @Param('brandId') brandId: string,
  ) {
    try {
      const response = await this.brandsService.delete(
        new Brand({
          id: brandId,
        }),
      );
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }
}
