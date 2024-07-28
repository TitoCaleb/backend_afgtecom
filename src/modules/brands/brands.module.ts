import { Module } from '@nestjs/common';
import { BrandsController } from './controller/brands.controller';
import { BrandsService } from './service/brands.service';
import { Brand } from 'src/domain/Brand';
import { Device } from 'src/domain/Device';
import { Client } from 'src/domain/Client';
import { Token } from 'src/domain/Token';
import { SecurityRepositoryImpl } from '../security/repository/security.repository';
import { BrandsRepositoryImpl } from './repository/brands.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Device, Client, Token])],
  controllers: [BrandsController],
  providers: [BrandsService, BrandsRepositoryImpl, SecurityRepositoryImpl],
})
export class BrandsModule {}
