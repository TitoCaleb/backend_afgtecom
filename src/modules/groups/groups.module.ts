import { Module } from '@nestjs/common';
import { GroupsController } from './controller/groups.controller';
import { GroupsService } from './service/groups.service';
import { GroupsRepositoryImpl } from './repository/groups.repository';
import { SecurityRepositoryImpl } from '../security/repository/security.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/domain/Group';
import { Device } from 'src/domain/Device';
import { Client } from 'src/domain/Client';
import { Token } from 'src/domain/Token';

@Module({
  imports: [TypeOrmModule.forFeature([Group, Device, Client, Token])],
  controllers: [GroupsController],
  providers: [GroupsService, GroupsRepositoryImpl, SecurityRepositoryImpl],
})
export class GroupsModule {}
