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
import { Department } from 'src/domain/Ubigeo/Department';
import { Province } from 'src/domain/Ubigeo/Province';
import { District } from 'src/domain/Ubigeo/District';
import { Country } from 'src/domain/Ubigeo/Country';

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
      Department,
      Province,
      District,
      Country,
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
