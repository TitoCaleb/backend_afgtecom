import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as uuid from 'uuid';
import { Client } from 'src/domain/Client';
import { Device } from 'src/domain/Device';
import { SecurityRepositoryImpl } from '../repository/security.repository';
import { Token } from 'src/domain/Token';
import { User, UserStatus } from 'src/domain/User';
import { UsersRepositoryImpl } from 'src/modules/users/repository/users.repository';
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class SecurityService {
  constructor(
    private securityRepository: SecurityRepositoryImpl,
    private userRepository: UsersRepositoryImpl,
  ) {}

  private getDate(timestamp?: Date | number) {
    if (!timestamp) return new Date();

    return new Date(timestamp);
  }

  private getExpiredTime() {
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

  private async decryptPassword(request: string, password: string) {
    const isMatch = await bcrypt.compare(password, request);
    if (!isMatch) {
      throw new HttpException('Bad credentials', 401, {
        description: 'Invalid credentials',
      });
    }
    return isMatch;
  }

  async validateUser(user: User): Promise<User> {
    const userDb = await this.userRepository.findByEmail(user);
    if (userDb.getStatus() === UserStatus.INACTIVE) {
      throw new UnauthorizedException('User is inactive');
    }
    await this.decryptPassword(userDb.password, user.password);
    if (userDb) {
      return userDb;
    }
    return undefined;
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
      throw new UnauthorizedException('Invalid credentials');
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

  async login(user: User, token: Token): Promise<User> {
    const userDb = await this.validateUser(user);
    if (!userDb) {
      throw new HttpException('Bad credentials', 401, {
        description: 'Invalid credentials',
      });
    }

    if (token.status) {
      throw new HttpException('Token expired', 401);
    }

    await this.securityRepository.asignUserToToken(token, userDb);

    return userDb;
  }

  async logout(token: Token) {
    await this.securityRepository.removeUserFromToken(token);
  }

  async findToken(request: Token) {
    const response = await this.securityRepository.findToken(request);
    return response;
  }
}
