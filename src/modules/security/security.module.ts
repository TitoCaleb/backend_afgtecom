import { Module } from '@nestjs/common';
import { SecurityController } from './controller/security.controller';
import { SecurityRepositoryImpl } from './repository/security.repository';
import { SecurityService } from './service/security.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from '../../domain/Device';
import { Client } from 'src/domain/Client';
import { Token } from 'src/domain/Token';
import { User } from 'src/domain/User';
import { UsersRepositoryImpl } from '../users/repository/users.repository';

@Module({
  controllers: [SecurityController],
  providers: [SecurityRepositoryImpl, SecurityService, UsersRepositoryImpl],
  imports: [TypeOrmModule.forFeature([Device, Client, Token, User])],
})
export class SecurityModule {}
