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
import { ProvidersService } from '../service/providers.service';
import { Response } from 'express';
import { ApiResponseError } from 'src/errors/handleErrors';
import { Provider } from 'src/domain/Provider';
import {
  createProviderSchema,
  updateProviderSchema,
} from './schema/providersSchema';
import { TokenGuard } from 'src/modules/security/guards';

@UseGuards(TokenGuard)
@Controller('providers')
export class ProvidersController {
  constructor(private providerService: ProvidersService) {}

  @Get()
  async findAll(
    @Res({ passthrough: true }) res: Response,
    @Query() { limit = 10, offset = 0 }: Query,
  ) {
    try {
      const response = await this.providerService.findAll();
      return {
        data: response.map((provider) => provider.getApiData()),
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

  @Get(':providerId')
  async findById(
    @Res({ passthrough: true }) res: Response,
    @Param('providerId') providerId: string,
  ) {
    try {
      const response = await this.providerService.findById(
        new Provider({
          id: providerId,
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
    @Body() provider: Provider,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const request = await createProviderSchema.parseAsync(provider);
      const response = await this.providerService.create(new Provider(request));
      res.status(HttpStatus.CREATED);
      return response.getApiData();
    } catch (e: any) {
      res.status(HttpStatus.NOT_FOUND);
      return ApiResponseError(e, res);
    }
  }

  @Put(':providerId')
  async update(
    @Res({ passthrough: true }) res: Response,
    @Param('providerId') providerId: string,
    @Body() provider: Provider,
  ) {
    try {
      const request = await updateProviderSchema.parseAsync({
        id: providerId,
        ...provider,
      });
      const response = await this.providerService.update(new Provider(request));
      res.status(HttpStatus.OK);
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Delete(':providerId')
  async delete(
    @Res({ passthrough: true }) res: Response,
    @Param('providerId') providerId: string,
  ) {
    try {
      const response = await this.providerService.delete(
        new Provider({ id: providerId }),
      );
      res.status(HttpStatus.OK);
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }
}