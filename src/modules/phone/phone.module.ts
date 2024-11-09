import { Module } from '@nestjs/common';
import { PhoneService } from './service/phone.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from 'src/domain/Phone';
import { PhoneRepositoryImpl } from './repository/phone.repository';
import { PhoneController } from './controller/phone.controller';
import { Device } from 'src/domain/Device';
import { Client } from 'src/domain/Client';
import { Token } from 'src/domain/Token';
import { SecurityRepositoryImpl } from '../security/repository/security.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Phone, Device, Client, Token])],
  providers: [PhoneService, PhoneRepositoryImpl, SecurityRepositoryImpl],
  controllers: [PhoneController],
})
export class PhoneModule {}
