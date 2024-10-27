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
import { SubgroupsService } from '../service/subgroups.service';
import { Response } from 'express';
import { ApiResponseError } from 'src/errors/handleErrors';
import { Subgroup } from 'src/domain/Subgroup';
import { Group } from 'src/domain/Group';
import {
  createSubgroupSchema,
  updateSubgroupSchema,
} from './schema/subgroupSchema';

@UseGuards(TokenGuard)
@Controller('subgroups')
export class SubgroupsController {
  constructor(private subgroupsService: SubgroupsService) {}

  @Get()
  async findAll(
    @Res({ passthrough: true }) res: Response,
    @Query() { limit = 10, offset = 0 }: Query,
  ) {
    try {
      const response = await this.subgroupsService.findAll();
      return {
        data: response.map((group) => group.getApiData()),
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

  @Get(':subgroupId')
  async findById(
    @Res({ passthrough: true }) res: Response,
    @Param('subgroupId') subgroupId: string,
  ) {
    try {
      const response = await this.subgroupsService.findById(
        new Subgroup({ id: subgroupId }),
      );
      return {
        data: response.getApiData(),
      };
    } catch (e: any) {
      res.status(HttpStatus.NOT_FOUND);
      return ApiResponseError(e, res);
    }
  }

  @Get(':groupId/group')
  async findByBrandId(
    @Res({ passthrough: true }) res: Response,
    @Param('groupId') groupId: string,
  ) {
    try {
      const response = await this.subgroupsService.findByGroupId(
        new Group({ id: groupId }),
      );
      return {
        data: response.map((subgroup) => subgroup.getApiData()),
      };
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Post()
  async create(
    @Body() subgroup: Subgroup,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const request = await createSubgroupSchema.parseAsync(subgroup);
      const response = await this.subgroupsService.create(
        new Subgroup(request),
      );
      res.status(HttpStatus.CREATED);
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Put(':subgroupId')
  async update(
    @Res({ passthrough: true }) res: Response,
    @Param('subgroupId') subgroupId: string,
    @Body() subgroup: Subgroup,
  ) {
    try {
      const request = await updateSubgroupSchema.parseAsync({
        id: subgroupId,
        ...subgroup,
      });
      const response = await this.subgroupsService.update(
        new Subgroup(request),
      );
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Delete(':subgroupId')
  async delete(
    @Res({ passthrough: true }) res: Response,
    @Param('subgroupId') subgroupId: string,
  ) {
    try {
      const response = await this.subgroupsService.delete(
        new Subgroup({ id: subgroupId }),
      );
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }
}
