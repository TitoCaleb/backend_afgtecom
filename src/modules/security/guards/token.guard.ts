import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { SecurityRepositoryImpl } from '../repository/security.repository';
import { Token } from 'src/domain/Token';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private tokenRepository: SecurityRepositoryImpl) {}

  private getDate(timestamp?: Date | number) {
    if (!timestamp) return new Date();

    return new Date(timestamp);
  }

  private async getToken(value: string) {
    const token = await this.tokenRepository.findToken(
      new Token({
        token: value,
      }),
    );

    if (!token.status && token.userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    if (token.status && !token.userId) {
      throw new UnauthorizedException('Token not found');
    }

    if (token.expiredAt < this.getDate()) {
      await this.tokenRepository.updateToken({
        tokenDb: token,
        updateToken: new Token({ ...token, userId: '' }),
      });
      throw new UnauthorizedException('Token expired');
    }

    return token;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authToken =
      request.headers.authorization || request.headers.Authorization;

    if (!authToken) {
      throw new UnauthorizedException('Missing authorization token');
    }

    const token = await this.getToken(authToken);

    request.token = token;
    return true;
  }
}
