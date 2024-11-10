import { Module } from '@nestjs/common';
import { ProductsController } from './controller/products.controller';
import { ProductsService } from './service/products.service';
import { ProductsRepositoryImpl } from './repository/products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/domain/Products';
import { Brand } from 'src/domain/Brand';
import { Group } from 'src/domain/Group';
import { Subgroup } from 'src/domain/Subgroup';
import { Factoring } from 'src/domain/factoring';
import { Pricing } from 'src/domain/Pricing';
import { Device } from 'src/domain/Device';
import { Client } from 'src/domain/Client';
import { Token } from 'src/domain/Token';
import { SecurityRepositoryImpl } from '../security/repository/security.repository';
import { BrandsRepositoryImpl } from '../brands/repository/brands.repository';
import { SubgroupsRepositoryImpl } from '../subgroups/repository/subgroups.repository';
import { GroupsRepositoryImpl } from '../groups/repository/groups.repository';
import { PricingRepositoryImpl } from './repository/pricing.repository';
import { FactoringRepositoryImpl } from './repository/factoring.repository';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsRepositoryImpl,
    SecurityRepositoryImpl,
    BrandsRepositoryImpl,
    SubgroupsRepositoryImpl,
    GroupsRepositoryImpl,
    PricingRepositoryImpl,
    FactoringRepositoryImpl,
  ],
  imports: [
    TypeOrmModule.forFeature([
      Products,
      Brand,
      Group,
      Subgroup,
      Factoring,
      Pricing,
      Device,
      Client,
      Token,
    ]),
  ],
})
export class ProductsModule {}
