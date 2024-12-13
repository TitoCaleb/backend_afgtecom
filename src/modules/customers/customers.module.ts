import { Module } from '@nestjs/common';
import { CustomersController } from './controller/customers.controller';
import { CustomersService } from './service/customers.service';
import { CustomersRepositoryImpl } from './repository/customers.repository';
import { EmployeeService } from '../employees/service/employees.service';
import { EmployeesRepositoryImpl } from '../employees/repository/employees.repository';
import { BanksRepositoryImpl } from '../banks/repository/banks.repository';
import { BankAccountService } from '../bankAccounts/service/bankAccount.service';
import { BankAccountRepositoryImpl } from '../bankAccounts/repository/bankAccount.repository';
import { BusinessSectorRepositoryImpl } from '../business-sector/repository/business-sector.repository';
import { SecurityRepositoryImpl } from '../security/repository/security.repository';
import { PaymentTermRepositoryImpl } from '../paymentTerm/repository/paymentTerm.repository';
import { BaseRepositoryImpl } from '../base/repository/base.repository';
import { Token } from 'src/domain/Token';
import { Client } from 'src/domain/Client';
import { Device } from 'src/domain/Device';
import { PaymentTerm } from 'src/domain/PaymentTerm';
import { BusinessSector } from 'src/domain/BusinessSector';
import { Employee } from 'src/domain/Employee';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentType } from 'src/domain/DocumentType';
import { Customer } from 'src/domain/Customer';
import { ProvidersRepositoryImpl } from '../providers/repository/providers.repository';
import { ProvidersService } from '../providers/service/providers.service';
import { Bank } from 'src/domain/Banks';
import { BankAccount } from 'src/domain/BankAccount';
import { CivilStatus } from 'src/domain/CivilStatus';
import { Rol } from 'src/domain/Rol';
import { Country } from 'src/domain/Country';
import { Department } from 'src/domain/Department';
import { Province } from 'src/domain/Province';
import { District } from 'src/domain/District';
import { Provider } from 'src/domain/Provider';
import { Phone } from 'src/domain/Phone';
import { PhoneRepositoryImpl } from '../phone/repository/phone.repository';
import { PhoneService } from '../phone/service/phone.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Provider,
      Employee,
      Customer,
      BusinessSector,
      Bank,
      BankAccount,
      BusinessSector,
      CivilStatus,
      Rol,
      Country,
      Department,
      Province,
      District,
      PaymentTerm,
      Device,
      Client,
      Token,
      DocumentType,
      Phone,
    ]),
  ],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    CustomersRepositoryImpl,
    EmployeeService,
    EmployeesRepositoryImpl,
    BanksRepositoryImpl,
    BankAccountService,
    BankAccountRepositoryImpl,
    BusinessSectorRepositoryImpl,
    SecurityRepositoryImpl,
    PaymentTermRepositoryImpl,
    BaseRepositoryImpl,
    ProvidersRepositoryImpl,
    ProvidersService,
    PhoneRepositoryImpl,
    PhoneService,
  ],
})
export class CustomersModule {}
