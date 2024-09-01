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
import { CategoriesService } from '../service/categories.service';
import { Response } from 'express';
import { ApiResponseError } from 'src/errors/handleErrors';
import { Category } from 'src/domain/Category';
import {
  createCategorySchema,
  updateCategorySchema,
} from './schema/categorySchema';

@UseGuards(TokenGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private cateogryService: CategoriesService) {}

  @Get()
  async findAll(@Res({ passthrough: true }) res: Response) {
    try {
      const response = await this.cateogryService.findAll();
      return {
        data: response.map((category) => category.getApiData()),
      };
    } catch (e: any) {
      res.status(HttpStatus.NOT_FOUND);
      return ApiResponseError(e, res);
    }
  }

  @Get(':categoryId')
  async findById(
    @Res({ passthrough: true }) res: Response,
    @Param('categoryId') categoryId: string,
  ) {
    try {
      const response = await this.cateogryService.findById(
        new Category({
          id: categoryId,
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
    @Body() category: Category,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const request = await createCategorySchema.parseAsync(category);
      const response = await this.cateogryService.create(new Category(request));
      res.status(HttpStatus.CREATED);
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Put(':categoryId')
  async update(
    @Res({ passthrough: true }) res: Response,
    @Param('categoryId') categoryId: string,
    @Body() category: Category,
  ) {
    try {
      const request = await updateCategorySchema.parseAsync({
        id: categoryId,
        ...category,
      });
      const response = await this.cateogryService.update(new Category(request));
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Delete(':categoryId')
  async delete(
    @Res({ passthrough: true }) res: Response,
    @Param('categoryId') categoryId: string,
  ) {
    try {
      const response = await this.cateogryService.delete(
        new Category({
          id: categoryId,
        }),
      );
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }
}
