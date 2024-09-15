import { Bank } from 'src/domain/Banks';
import { BankAccount } from 'src/domain/BankAccount';
import { BankAccountRepositoryImpl } from './repository/bankAccount.repository';
import { BankAccountService } from './service/bankAccount.service';
import { BanksAccountController } from './controller/banksAccounts.controller';
import { BanksRepositoryImpl } from '../banks/repository/banks.repository';
import { BusinessSector } from 'src/domain/BusinessSector';
import { BusinessSectorRepositoryImpl } from '../business-sector/repository/business-sector.repository';
import { Employee } from 'src/domain/Employee';
import { EmployeesController } from './controller/employees.controller';
import { EmployeeService } from './service/employees.service';
import { EmployeesRepositoryImpl } from './repository/employees.repository';
import { Module } from '@nestjs/common';
import { Provider } from 'src/domain/Provider';
import { ProvidersController } from './controller/providers.controller';
import { ProvidersRepositoryImpl } from './repository/providers.repository';
import { ProvidersService } from './service/providers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTerm } from 'src/domain/PaymentTerm';
import { SecurityRepositoryImpl } from '../security/repository/security.repository';
import { Device } from 'src/domain/Device';
import { Client } from 'src/domain/Client';
import { Token } from 'src/domain/Token';
import { PaymentTermRepositoryImpl } from '../paymentTerm/repository/paymentTerm.repository';
import { BaseRepositoryImpl } from '../base/repository/base.repository';
import { DocumentType } from 'src/domain/DocumentType';
import { CivilStatus } from 'src/domain/CivilStatus';
import { Rol } from 'src/domain/Rol';
import { Country } from 'src/domain/Ubigeo/Country';
import { Department } from 'src/domain/Ubigeo/Department';
import { Province } from 'src/domain/Ubigeo/Province';
import { District } from 'src/domain/Ubigeo/District';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      Provider,
      Bank,
      BankAccount,
      BusinessSector,
      PaymentTerm,
      Device,
      Client,
      Token,
      DocumentType,
      CivilStatus,
      Rol,
      Country,
      Department,
      Province,
      District,
    ]),
  ],
  controllers: [
    ProvidersController,
    EmployeesController,
    BanksAccountController,
  ],
  providers: [
    ProvidersService,
    ProvidersRepositoryImpl,
    EmployeeService,
    EmployeesRepositoryImpl,
    BanksRepositoryImpl,
    BankAccountService,
    BankAccountRepositoryImpl,
    BusinessSectorRepositoryImpl,
    SecurityRepositoryImpl,
    PaymentTermRepositoryImpl,
    BaseRepositoryImpl,
  ],
})
export class ProvidersModule {}
