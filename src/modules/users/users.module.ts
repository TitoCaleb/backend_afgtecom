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

@Module({
  imports: [TypeOrmModule.forFeature([User, CivilStatus, DocumentType, Rol])],
  providers: [UsersService, UsersRepositoryImpl, BaseRepositoryImpl],
  controllers: [UsersController],
})
export class UsersModule {}
