import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { SecurityRepositoryImpl } from '../repository/security.repository';
import { Token } from 'src/domain/Token';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenRepository: SecurityRepositoryImpl) {}

  private async getToken(value: string) {
    const token = await this.tokenRepository.findToken(
      new Token({
        token: value,
      }),
    );
    return token;
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    let authToken: string | undefined;

    if (request.headers.authorization || request.headers.Authorization) {
      authToken =
        request.headers.authorization || request.headers.Authorization;
    }

    if (authToken) {
      const token = await this.getToken(authToken);

      if (token) {
        request.token = token;
        return true;
      } else {
        throw new UnauthorizedException('Unauthorized');
      }
    } else {
      throw new UnauthorizedException('Missing authorization token');
    }
  }
}
