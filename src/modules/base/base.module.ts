import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CivilStatus } from 'src/domain/CivilStatus';
import { DocumentType } from 'src/domain/DocumentType';
import { Rol } from 'src/domain/Rol';
import { BaseService } from './service/base.service';
import { BaseRepositoryImpl } from './repository/base.repository';
import { BaseController } from './controller/base.controller';
import { SecurityRepositoryImpl } from '../security/repository/security.repository';
import { Device } from 'src/domain/Device';
import { Client } from 'src/domain/Client';
import { Token } from 'src/domain/Token';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CivilStatus,
      DocumentType,
      Rol,
      Device,
      Client,
      Token,
    ]),
  ],
  providers: [BaseService, BaseRepositoryImpl, SecurityRepositoryImpl],
  controllers: [BaseController],
})
export class BaseModule {}
