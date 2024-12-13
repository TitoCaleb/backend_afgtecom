import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { SecurityService } from '../service/security.service';
import { ApiResponseError } from 'src/errors/handleErrors';
import { User } from 'src/domain/User';
import { loginSchema } from './schema/securitySchema';
import { LoginGuard, AuthGuard } from '../guards';

@Controller('security')
export class SecurityController {
  constructor(private securityService: SecurityService) {}

  @Post('login')
  @UseGuards(LoginGuard)
  async login(
    @Req() req: Request,
    @Body() data: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const request = await loginSchema.parseAsync(data);
      const response = await this.securityService.login(
        new User(request),
        (req as any).token,
      );
      res.status(HttpStatus.OK);
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Get('logout')
  @UseGuards(LoginGuard)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      const request = (req as any).token;
      await this.securityService.logout(request);
      return;
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Post('generate_token')
  @UseGuards(AuthGuard)
  async generateToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const request = (req as any).token;
      const response = await this.securityService.createToken(request);
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }
}
