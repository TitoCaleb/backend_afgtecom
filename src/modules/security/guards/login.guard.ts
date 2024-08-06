import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { SecurityRepositoryImpl } from '../repository/security.repository';
import { Token } from 'src/domain/Token';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private tokenRepository: SecurityRepositoryImpl) {}

  private getDate(timestamp?: Date | number) {
    if (!timestamp) return new Date();

    return new Date(timestamp);
  }

  private async getToken(requestToken: string): Promise<{ newToken: Token }> {
    const newToken = await this.tokenRepository.findToken(
      new Token({
        token: requestToken,
      }),
    );

    if (newToken.expiredAt < this.getDate()) {
      await this.tokenRepository.updateToken({
        tokenDb: newToken,
        updateToken: new Token({ ...newToken, userId: '' }),
      });
      throw new UnauthorizedException('Token expired');
    }

    return { newToken };
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    let authToken: string | undefined;

    if (request.headers.authorization || request.headers.Authorization) {
      authToken =
        request.headers.authorization || request.headers.Authorization;
    }

    if (authToken) {
      const { newToken } = await this.getToken(authToken);

      if (newToken) {
        request.token = newToken;
        return true;
      } else {
        throw new UnauthorizedException('Unauthorized');
      }
    } else {
      throw new UnauthorizedException('Missing authorization token');
    }
  }
}
