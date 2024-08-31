import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/domain/Client';
import { Device } from 'src/domain/Device';
import { PaymentTerm } from 'src/domain/PaymentTerm';
import { Token } from 'src/domain/Token';
import { PaymentTermController } from './controller/paymentTerm.controller';
import { SecurityRepositoryImpl } from '../security/repository/security.repository';
import { PaymentTermService } from './service/paymentTerm.service';
import { PaymentTermRepositoryImpl } from './repository/paymentTerm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Device, Client, Token, PaymentTerm])],
  controllers: [PaymentTermController],
  providers: [
    PaymentTermService,
    PaymentTermRepositoryImpl,
    SecurityRepositoryImpl,
  ],
})
export class PaymentTermModule {}
