import { Module } from '@nestjs/common';
import { BanksController } from './controller/banks.controller';
import { BanksService } from './service/banks.service';
import { BanksRepositoryImpl } from './repository/banks.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from 'src/domain/Banks';
import { Device } from 'src/domain/Device';
import { Client } from 'src/domain/Client';
import { Token } from 'src/domain/Token';
import { SecurityRepositoryImpl } from '../security/repository/security.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Bank, Device, Client, Token])],
  controllers: [BanksController],
  providers: [BanksService, BanksRepositoryImpl, SecurityRepositoryImpl],
})
export class BanksModule {}
