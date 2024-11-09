import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PhoneService } from '../service/phone.service';
import { TokenGuard } from 'src/modules/security/guards';
import { Phone } from 'src/domain/Phone';
import { updatePhoneSchema } from './schema/phoneSchema';
import { ApiResponseError } from 'src/errors/handleErrors';
import { Response } from 'express';

@UseGuards(TokenGuard)
@Controller('phone')
export class PhoneController {
  constructor(private phoneService: PhoneService) {}

  @Put(':phoneId')
  async update(
    @Res({ passthrough: true }) res: Response,
    @Param('phoneId') phoneId: string,
    @Body() phone: Phone,
  ) {
    try {
      const request = await updatePhoneSchema.parseAsync({
        id: phoneId,
        ...phone,
      });
      const response = await this.phoneService.update(new Phone(request));
      return response.getApiData();
    } catch (e: any) {
      res.status(HttpStatus.NOT_FOUND);
      return ApiResponseError(e, res);
    }
  }
}
