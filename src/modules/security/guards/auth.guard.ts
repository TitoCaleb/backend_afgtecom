import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Client } from 'src/domain/Client';
import { Device } from 'src/domain/Device';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}

  private decryptValue(value: string) {
    const ENCRYPTION_KEY = this.configService.get<string>('ENCRYPTION_KEY');
    if (!value) {
      return '';
    }

    const parts = value.split(':');
    const ivBuffer = Buffer.from(parts[0], 'base64');
    let encryptedString = parts[1];

    encryptedString = encryptedString
      .replace(/@/g, '/')
      .replace(/\$/g, '=')
      .replace(/ /g, '+');

    const key = Buffer.from(ENCRYPTION_KEY, 'utf8');

    const encryptedData = Buffer.from(encryptedString, 'base64');

    try {
      const decipher = crypto.createDecipheriv('aes-256-cbc', key, ivBuffer);
      let decryptedData = decipher.update(
        encryptedData.toString('base64'),
        'base64',
        'utf8',
      );
      decryptedData += decipher.final('utf8');

      return decryptedData;
    } catch (ex: any) {
      return ex.message + ' - ' + (ex.cause ? ex.cause.message : '');
    }
  }

  private getToken(token: string) {
    const { clientId, clientSecret, deviceName, deviceUuid } = this.jwt.verify(
      token,
    ) as Client & Device;

    return {
      clientId: this.decryptValue(clientId),
      clientSecret: this.decryptValue(clientSecret),
      deviceName: this.decryptValue(deviceName),
      deviceUuid: this.decryptValue(deviceUuid),
    };
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Missing authorization token');
    }

    const bearerToken = authorization.split(' ')[1];

    if (!bearerToken) {
      throw new UnauthorizedException('Bearer token is missing');
    }

    if (bearerToken) {
      const payload = this.getToken(bearerToken);
      request.token = payload;
      return true;
    } else {
      throw new UnauthorizedException('Missing authorization token');
    }
  }
}
