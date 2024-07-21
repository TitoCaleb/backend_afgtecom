import { Module } from '@nestjs/common';
import { SecurityController } from './controller/security.controller';
import { SecurityRepositoryImpl } from './repository/security.repository';
import { SecurityService } from './service/security.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from '../../domain/Device';
import { Client } from 'src/domain/Client';
import { Token } from 'src/domain/Token';

@Module({
  controllers: [SecurityController],
  providers: [SecurityRepositoryImpl, SecurityService],
  imports: [TypeOrmModule.forFeature([Device, Client, Token])],
})
export class SecurityModule {}
