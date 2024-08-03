import { Module } from '@nestjs/common';
import { ProvidersController } from './controller/providers.controller';
import { ProvidersService } from './service/providers.service';
import { EmployeesRepositoryImpl } from './repository/employees.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/domain/Employee';
import { Provider } from 'src/domain/Provider';
import { ProvidersRepositoryImpl } from './repository/providers.repository';
import { EmployeesController } from './controller/employees.controller';
import { EmployeeService } from './service/employees.service';
import { Bank } from 'src/domain/Banks';
import { BankAccount } from 'src/domain/BankAccount';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Provider, Bank, BankAccount])],
  controllers: [ProvidersController, EmployeesController],
  providers: [
    ProvidersService,
    EmployeeService,
    EmployeesRepositoryImpl,
    ProvidersRepositoryImpl,
  ],
})
export class ProvidersModule {}
