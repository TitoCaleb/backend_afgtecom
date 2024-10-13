import config from './config/config';
import enviroments from './config/enviroments';
import { BanksModule } from './modules/banks/banks.module';
import { BaseModule } from './modules/base/base.module';
import { BrandsModule } from './modules/brands/brands.module';
import { BusinessSectorModule } from './modules/business-sector/business-sector.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { LinesModule } from './modules/lines/lines.module';
import { Module } from '@nestjs/common';
import { ProvidersModule } from './modules/providers/providers.module';
import { SecurityModule } from './modules/security/security.module';
import { UsersModule } from './modules/users/users.module';
import { PaymentTermModule } from './modules/paymentTerm/paymentTerm.module';
import { CustomersModule } from './modules/customers/customers.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { BankAccountsModule } from './modules/bankAccounts/bankAccounts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: enviroments[process.env.NODE_ENV] || './prod/.env',
      load: [config],
    }),
    SecurityModule,
    DatabaseModule,
    BaseModule,
    UsersModule,
    BrandsModule,
    LinesModule,
    ProvidersModule,
    BusinessSectorModule,
    BanksModule,
    CategoriesModule,
    PaymentTermModule,
    CustomersModule,
    EmployeesModule,
    BankAccountsModule,
  ],
})
export class AppModule {}
