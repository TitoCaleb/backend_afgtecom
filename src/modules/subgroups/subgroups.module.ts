import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/domain/Client';
import { Device } from 'src/domain/Device';
import { Subgroup } from 'src/domain/Subgroup';
import { Token } from 'src/domain/Token';
import { SecurityRepositoryImpl } from '../security/repository/security.repository';
import { SubgroupsController } from './controller/subgroups.controller';
import { SubgroupsService } from './service/subgroups.service';
import { SubgroupsRepositoryImpl } from './repository/subgroups.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Subgroup, Device, Client, Token])],
  controllers: [SubgroupsController],
  providers: [
    SubgroupsService,
    SubgroupsRepositoryImpl,
    SecurityRepositoryImpl,
  ],
})
export class SubgroupsModule {}
