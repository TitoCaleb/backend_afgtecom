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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      Provider,
      Bank,
      BankAccount,
      BusinessSector,
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
  ],
})
export class ProvidersModule {}
