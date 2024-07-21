import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { SecurityService } from '../service/security.service';
import { ApiReponseError } from 'src/errors/handleErrors';

@Controller('security')
export class SecurityController {
  constructor(private securityService: SecurityService) {}

  @Post('login')
  login(@Req() req: Request) {
    const { username, password } = req.body;
    return { username, password };
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
      return ApiReponseError(e, res);
    }
  }
}
