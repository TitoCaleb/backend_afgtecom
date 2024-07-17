import { Module } from '@nestjs/common';
import { SecurityController } from './controller/security.controller';
import { SecurityRepositoryImpl } from './repository/security.repository';
import { SecurityService } from './service/security.service';

@Module({
  controllers: [SecurityController],
  providers: [SecurityRepositoryImpl, SecurityService],
})
export class SecurityModule {}
