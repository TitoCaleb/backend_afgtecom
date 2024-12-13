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
import { Response } from 'express';
import { ApiResponseError } from 'src/errors/handleErrors';
import { UsersService } from '../service/users.service';
import {
  createUserSchema,
  updateUserPasswordSchema,
  updateUserSchema,
} from './schema/userSchema';
import { QueryUser, User } from 'src/domain/User';
import { TokenGuard } from '../../security/guards';
import { Like } from 'typeorm';

@UseGuards(TokenGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  private dynamicQuery(query: QueryUser) {
    const where: any = {};
    if (query.name) {
      where.name = Like(`%${query.name}%`);
    }
    if (query.documentNumber) {
      where.documentNumber = Like(`%${query.documentNumber}%`);
    }
    if (query.email) {
      where.email = Like(`%${query.email}%`);
    }
    return where;
  }

  @Get()
  async findAll(
    @Res({ passthrough: true }) res: Response,
    @Query() { limit = 10, offset = 0, documentNumber, email, name }: QueryUser,
  ) {
    try {
      const { response, total } = await this.usersService.findAll(
        this.dynamicQuery({ name, documentNumber, email }),
        limit,
        offset,
      );
      return {
        data: response.map((user) => user.getApiData()),
        pagination: {
          limit,
          offset,
        },
        total,
      };
    } catch (e: any) {
      res.status(HttpStatus.NOT_FOUND);
      return ApiResponseError(e, res);
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
      return {
        data: response.getApiData(),
      };
    } catch (e: any) {
      res.status(HttpStatus.NOT_FOUND);
      return ApiResponseError(e, res);
    }
  }

  @Post()
  async create(@Body() user: User, @Res({ passthrough: true }) res: Response) {
    try {
      const request = await createUserSchema.parseAsync(user);
      const response = await this.usersService.create(new User(request));
      res.status(HttpStatus.CREATED);
      return response.getApiWithPassword();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Put(':userId')
  async update(
    @Res({ passthrough: true }) res: Response,
    @Param('userId') userId: string,
    @Body() user: User,
  ) {
    try {
      const request = await updateUserSchema.parseAsync({
        id: userId,
        ...user,
      });
      const response = await this.usersService.update(new User(request));
      res.status(HttpStatus.OK);
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Put(':userId/password')
  async updatePassword(
    @Res({ passthrough: true }) res: Response,
    @Param('userId') userId: string,
    @Body() user: User,
  ) {
    try {
      const request = await updateUserPasswordSchema.parseAsync({
        id: userId,
        ...user,
      });
      await this.usersService.updatePassword(request);
      res.status(HttpStatus.OK);
      return;
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Delete(':userId')
  async delete(
    @Res({ passthrough: true }) res: Response,
    @Param('userId') userId: string,
  ): Promise<ResponseController<User>> {
    try {
      const response = await this.usersService.delete(new User({ id: userId }));
      res.status(HttpStatus.OK);
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }
}
