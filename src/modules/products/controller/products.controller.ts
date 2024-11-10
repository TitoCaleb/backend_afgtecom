import {
  Body,
  Controller,
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
import { ProductsService } from '../service/products.service';
import { Response } from 'express';
import { Products, QueryProduct } from 'src/domain/Products';
import { ApiResponseError } from 'src/errors/handleErrors';
import {
  createProductSchema,
  updateProductSchema,
} from './schema/productSchema';
import { Like } from 'typeorm';

@UseGuards(TokenGuard)
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  private dynamicQuery(query: QueryProduct) {
    const where: any = {};
    if (query.serie) {
      where.serie = Like(`%${query.serie}%`);
    }
    if (query.code) {
      where.code = Like(`%${query.code}%`);
    }
    if (query.brand) {
      where.brand = query.brand;
    }
    if (query.group) {
      where.group = query.group;
    }
    if (query.subGroup) {
      where.subGroup = query.subGroup;
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
    @Query()
    { limit, offset, code, serie, group, subGroup, brand }: QueryProduct,
  ) {
    try {
      const { response, total, pagination } =
        await this.productsService.findAll(
          this.dynamicQuery({
            limit,
            offset,
            code,
            serie,
            group,
            subGroup,
            brand,
          }),
        );
      return {
        data: response.map((item) => item.getApiData()),
        pagination,
        total,
      };
    } catch (e: any) {
      res.status(HttpStatus.NOT_FOUND);
      return ApiResponseError(e, res);
    }
  }

  @Get(':productId')
  async findById(
    @Res({ passthrough: true }) res: Response,
    @Param('productId') productId: string,
  ) {
    try {
      const response = await this.productsService.findById(
        new Products({
          id: productId,
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
    @Body() product: Products,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const request = await createProductSchema.parseAsync(product);
      const response = await this.productsService.create(new Products(request));
      res.status(HttpStatus.CREATED);
      return response.getApiData();
    } catch (e: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return ApiResponseError(e, res);
    }
  }

  @Put(':productId')
  async update(
    @Res({ passthrough: true }) res: Response,
    @Param('productId') productId: string,
    @Body() product: Products,
  ) {
    try {
      const request = await updateProductSchema.parseAsync({
        id: productId,
        ...product,
      });
      const response = await this.productsService.update(new Products(request));
      res.status(HttpStatus.OK);
      return response.getApiData();
    } catch (e: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return ApiResponseError(e, res);
    }
  }
}
