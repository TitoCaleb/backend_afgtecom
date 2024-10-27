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
import { GroupsService } from '../service/groups.service';
import { Response } from 'express';
import { ApiResponseError } from 'src/errors/handleErrors';
import { Group } from 'src/domain/Group';
import { createGroupSchema, updateGroupSchema } from './schema/groupSchema';
import { Brand } from 'src/domain/Brand';

@UseGuards(TokenGuard)
@Controller('groups')
export class GroupsController {
  constructor(private groupService: GroupsService) {}

  @Get()
  async findAll(
    @Res({ passthrough: true }) res: Response,
    @Query() { limit = 10, offset = 0 }: Query,
  ) {
    try {
      const response = await this.groupService.findAll();
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

  @Get(':groupId')
  async findById(
    @Res({ passthrough: true }) res: Response,
    @Param('groupId') groupId: string,
  ) {
    try {
      const response = await this.groupService.findById(
        new Group({ id: groupId }),
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
      const response = await this.groupService.findByBrandId(
        new Brand({ id: brandId }),
      );
      return {
        data: response.map((group) => group.getApiData()),
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
  async create(
    @Body() group: Group,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const request = await createGroupSchema.parseAsync(group);
      const response = await this.groupService.create(new Group(request));
      res.status(HttpStatus.CREATED);
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Put(':groupId')
  async update(
    @Res({ passthrough: true }) res: Response,
    @Param('groupId') groupId: string,
    @Body() group: Group,
  ) {
    try {
      const request = await updateGroupSchema.parseAsync({
        id: groupId,
        ...group,
      });
      const response = await this.groupService.update(new Group(request));
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Delete(':groupId')
  async delete(
    @Res({ passthrough: true }) res: Response,
    @Param('groupId') groupId: string,
  ) {
    try {
      const response = await this.groupService.delete(
        new Group({ id: groupId }),
      );
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }
}
