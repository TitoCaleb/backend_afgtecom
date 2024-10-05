import { Module } from '@nestjs/common';
import { EmployeesController } from './controller/employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/domain/Customer';
import { Employee } from 'src/domain/Employee';
import { Provider } from 'src/domain/Provider';
import { Bank } from 'src/domain/Banks';
import { BankAccount } from 'src/domain/BankAccount';
import { BusinessSector } from 'src/domain/BusinessSector';
import { PaymentTerm } from 'src/domain/PaymentTerm';
import { Device } from 'src/domain/Device';
import { Client } from 'src/domain/Client';
import { Token } from 'src/domain/Token';
import { CivilStatus } from 'src/domain/CivilStatus';
import { Rol } from 'src/domain/Rol';
import { Country } from 'src/domain/Country';
import { Department } from 'src/domain/Department';
import { Province } from 'src/domain/Province';
import { District } from 'src/domain/District';
import { CustomersService } from '../customers/service/customers.service';
import { CustomersRepositoryImpl } from '../customers/repository/customers.repository';
import { ProvidersService } from '../providers/service/providers.service';
import { ProvidersRepositoryImpl } from '../providers/repository/providers.repository';
import { EmployeeService } from './service/employees.service';
import { EmployeesRepositoryImpl } from './repository/employees.repository';
import { DocumentType } from 'src/domain/DocumentType';
import { PaymentTermRepositoryImpl } from '../paymentTerm/repository/paymentTerm.repository';
import { BaseRepositoryImpl } from '../base/repository/base.repository';
import { BusinessSectorRepositoryImpl } from '../business-sector/repository/business-sector.repository';
import { SecurityRepositoryImpl } from '../security/repository/security.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Customer,
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
  controllers: [EmployeesController],
  providers: [
    CustomersService,
    CustomersRepositoryImpl,
    ProvidersService,
    ProvidersRepositoryImpl,
    EmployeeService,
    EmployeesRepositoryImpl,
    PaymentTermRepositoryImpl,
    BaseRepositoryImpl,
    BusinessSectorRepositoryImpl,
    SecurityRepositoryImpl,
  ],
})
export class EmployeesModule {}
