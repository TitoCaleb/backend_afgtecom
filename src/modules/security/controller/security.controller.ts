import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { SecurityService } from '../service/security.service';

@Controller('security')
export class SecurityController {
  constructor(private securityService: SecurityService) {}

  @Post('login')
  login(@Req() req: Request) {
    const { username, password } = req.body;
    return { username, password };
  }

  @Post('generate_token')
  async generateToken(@Req() req: Request) {
    const res = await this.securityService.createToken(req.body);
    return res;
  }
}
