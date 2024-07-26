import {
  Body,
  Controller,
  Get,
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
import { AuthGuard } from '../guards/auth.guard';

@Controller('security')
export class SecurityController {
  constructor(private securityService: SecurityService) {}

  @Post('login')
  @UseGuards(AuthGuard)
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
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }

  @Get('logout')
  @UseGuards(AuthGuard)
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
  async generateToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const response = await this.securityService.createToken(req.body);
      return response.getApiData();
    } catch (e: any) {
      return ApiResponseError(e, res);
    }
  }
}
