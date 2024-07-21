import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Client } from 'src/domain/Client';
import { SecurityRepositoryImpl } from '../repository/security.repository';
import { Device } from 'src/domain/Device';
import { Token } from 'src/domain/Token';
import * as crypto from 'crypto';
import * as uuid from 'uuid';

@Injectable()
export class SecurityService {
  constructor(private securityRepository: SecurityRepositoryImpl) {}

  protected getDate(timestamp?: Date | number) {
    if (!timestamp) return new Date();

    return new Date(timestamp);
  }

  protected getExpiredTime() {
    const expiredDate = this.getDate().getTime() + 1000 * 60 * 60 * 24;
    return this.getDate(expiredDate);
  }

  private generateToken() {
    const randomHex = crypto.randomBytes(5).toString('hex');
    const currentTime = new Date().getTime();
    const timeHash = crypto
      .createHash('md5')
      .update(currentTime.toString())
      .digest('hex');
    return randomHex + timeHash;
  }

  async createToken(request: Client & Device) {
    const client =
      await this.securityRepository.findClientByCredentials(request);

    if (!client) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const device =
      await this.securityRepository.findDeviceByCredentials(request);

    if (!device) {
      throw new UnauthorizedException('Not found');
    }

    const token = await this.securityRepository.createToken(
      new Token({
        expiredAt: this.getExpiredTime(),
        createdAt: this.getDate(),
        deviceName: device.deviceName,
        deviceUuid: device.deviceUuid,
        deviceId: device.id,
        token: this.generateToken(),
        id: uuid.v4(),
      }),
    );

    return token;
  }
}
