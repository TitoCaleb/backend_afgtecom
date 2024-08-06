import { Device } from 'src/domain/Device';
import { Client } from 'src/domain/Client';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from 'src/domain/Token';
import { UnauthorizedException } from '@nestjs/common';

export class SecurityRepositoryImpl {
  constructor(
    @InjectRepository(Device) private deviceRepository: Repository<Device>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
  ) {}

  async findClientByCredentials(request: Client): Promise<Client> {
    const response = await this.clientRepository.findOneBy({
      clientId: request.clientId,
      clientSecret: request.clientSecret,
    });

    return response;
  }

  async findDeviceByCredentials(request: Device): Promise<Device> {
    const response = await this.deviceRepository.findOneBy({
      deviceName: request.deviceName,
      deviceUuid: request.deviceUuid,
    });

    return response;
  }

  async createToken(request: Token): Promise<Token> {
    const response = await this.tokenRepository.save(request);
    return response;
  }

  async findToken(request: Token): Promise<Token> {
    const response = await this.tokenRepository.findOneBy({
      token: request.token,
    });

    if (!response) {
      throw new UnauthorizedException('Invalid token');
    }

    return response;
  }

  async updateToken({
    updateToken,
    tokenDb,
  }: {
    updateToken: Token;
    tokenDb: Token;
  }): Promise<Token> {
    Object.assign(tokenDb, updateToken);
    const response = await this.tokenRepository.save(tokenDb);
    return response;
  }
}
