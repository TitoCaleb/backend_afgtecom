import { Module } from '@nestjs/common';
import { BanksAccountController } from './controller/banksAccounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from 'src/domain/Banks';
import { BankAccount } from 'src/domain/BankAccount';
import { Device } from 'src/domain/Device';
import { Client } from 'src/domain/Client';
import { Token } from 'src/domain/Token';
import { SecurityRepositoryImpl } from '../security/repository/security.repository';
import { BankAccountService } from './service/bankAccount.service';
import { BankAccountRepositoryImpl } from './repository/bankAccount.repository';
import { ProvidersRepositoryImpl } from '../providers/repository/providers.repository';
import { CustomersService } from '../customers/service/customers.service';
import { CustomersRepositoryImpl } from '../customers/repository/customers.repository';
import { ProvidersService } from '../providers/service/providers.service';
import { PaymentTermRepositoryImpl } from '../paymentTerm/repository/paymentTerm.repository';
import { BaseRepositoryImpl } from '../base/repository/base.repository';
import { BusinessSectorRepositoryImpl } from '../business-sector/repository/business-sector.repository';
import { Customer } from 'src/domain/Customer';
import { Provider } from 'src/domain/Provider';
import { PaymentTerm } from 'src/domain/PaymentTerm';
import { DocumentType } from 'src/domain/DocumentType';
import { CivilStatus } from 'src/domain/CivilStatus';
import { Rol } from 'src/domain/Rol';
import { Country } from 'src/domain/Country';
import { Department } from 'src/domain/Department';
import { Province } from 'src/domain/Province';
import { District } from 'src/domain/District';
import { BusinessSector } from 'src/domain/BusinessSector';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Bank,
      BankAccount,
      Device,
      Client,
      Token,
      Customer,
      Provider,
      PaymentTerm,
      DocumentType,
      CivilStatus,
      Rol,
      Country,
      Department,
      Province,
      District,
      BusinessSector,
    ]),
  ],
  controllers: [BanksAccountController],
  providers: [
    SecurityRepositoryImpl,
    BankAccountService,
    BankAccountRepositoryImpl,
    CustomersService,
    CustomersRepositoryImpl,
    ProvidersService,
    ProvidersRepositoryImpl,
    PaymentTermRepositoryImpl,
    BaseRepositoryImpl,
    BusinessSectorRepositoryImpl,
  ],
})
export class BankAccountsModule {}
