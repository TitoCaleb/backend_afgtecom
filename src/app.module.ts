import config from './config/config';
import enviroments from './config/enviroments';
import { BanksModule } from './modules/banks/banks.module';
import { BaseModule } from './modules/base/base.module';
import { BrandsModule } from './modules/brands/brands.module';
import { BusinessSectorModule } from './modules/business-sector/business-sector.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { GroupsModule } from './modules/groups/groups.module';
import { Module } from '@nestjs/common';
import { ProvidersModule } from './modules/providers/providers.module';
import { SecurityModule } from './modules/security/security.module';
import { UsersModule } from './modules/users/users.module';
import { PaymentTermModule } from './modules/paymentTerm/paymentTerm.module';
import { CustomersModule } from './modules/customers/customers.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { BankAccountsModule } from './modules/bankAccounts/bankAccounts.module';
import { SubgroupsModule } from './modules/subgroups/subgroups.module';
import { PhoneModule } from './modules/phone/phone.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
    }),
    SecurityModule,
    DatabaseModule,
    BaseModule,
    UsersModule,
    BrandsModule,
    GroupsModule,
    ProvidersModule,
    BusinessSectorModule,
    BanksModule,
    CategoriesModule,
    PaymentTermModule,
    CustomersModule,
    EmployeesModule,
    BankAccountsModule,
    SubgroupsModule,
    PhoneModule,
  ],
})
export class AppModule {}
