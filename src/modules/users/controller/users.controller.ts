import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiReponseError } from 'src/errors/handleErrors';
import { UsersService } from '../service/users.service';
import { createUserSchema } from './schema/userSchema';
import { User } from 'src/domain/User';
import { TokenGuard } from '../../security/guards';

@UseGuards(TokenGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(
    @Res({ passthrough: true }) res: Response,
    @Query() { limit = 10, offset = 0 }: Query,
  ) {
    try {
      const response = await this.usersService.findAll();
      return {
        data: response.map((user) => user.getApiData()),
        pagination: {
          limit,
          offset,
        },
      };
    } catch (e: any) {
      return ApiReponseError(e, res);
    }
  }

  @Get(':userId')
  async findById(
    @Res({ passthrough: true }) res: Response,
    @Param('userId') userId: string,
  ) {
    try {
      const response = await this.usersService.findById(
        new User({
          id: userId,
        }),
      );
      return response.getApiData();
    } catch (e: any) {
      return ApiReponseError(e, res);
    }
  }

  @Post()
  async create(@Body() user: User, @Res({ passthrough: true }) res: Response) {
    try {
      const request = await createUserSchema.validate(user);
      const response = await this.usersService.create(
        new User({
          ...request,
        }),
      );
      return response.getApiData();
    } catch (e: any) {
      return ApiReponseError(e, res);
    }
  }
}
