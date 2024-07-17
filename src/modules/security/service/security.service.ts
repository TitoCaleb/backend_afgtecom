import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Client } from 'src/domain/Client';
import { SecurityRepositoryImpl } from '../repository/security.repository';
import { Device } from 'src/domain/Device';
import { Token } from 'src/domain/Token';

@Injectable()
export class SecurityService {
  constructor(private securityRepository: SecurityRepositoryImpl) {}

  async createToken(request: Client & Device) {
    const client =
      await this.securityRepository.findClientByCredentials(request);

    const device =
      await this.securityRepository.findDeviceByCredentials(request);

    if (!client || !device) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return new Token({
      device_uid: device.deviceName,
      deviceId: device.id,
      token: 'token',
    });
  }
}
