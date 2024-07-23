import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/User';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { UsersRepositoryImpl } from './repository/users.repository';
import { CivilStatus } from 'src/domain/CivilStatus';
import { DocumentType } from 'src/domain/DocumentType';
import { Rol } from 'src/domain/Rol';
import { BaseRepositoryImpl } from '../base/repository/base.repository';
import { SecurityRepositoryImpl } from '../security/repository/security.repository';
import { Device } from 'src/domain/Device';
import { Client } from 'src/domain/Client';
import { Token } from 'src/domain/Token';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      CivilStatus,
      DocumentType,
      Rol,
      Device,
      Client,
      Token,
    ]),
  ],
  providers: [
    UsersService,
    UsersRepositoryImpl,
    BaseRepositoryImpl,
    SecurityRepositoryImpl,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
