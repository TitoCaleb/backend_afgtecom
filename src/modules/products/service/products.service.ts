import { Injectable } from '@nestjs/common';
import { Status } from 'src/utils/enums';
import { ProductsRepositoryImpl } from '../repository/products.repository';
import { Products, QueryProduct } from 'src/domain/Products';
import { SubgroupsRepositoryImpl } from 'src/modules/subgroups/repository/subgroups.repository';
import { Group } from 'src/domain/Group';
import { BrandsRepositoryImpl } from 'src/modules/brands/repository/brands.repository';
import { PricingRepositoryImpl } from '../repository/pricing.repository';
import { FactoringRepositoryImpl } from '../repository/factoring.repository';
import { Subgroup } from 'src/domain/Subgroup';
import { Brand } from 'src/domain/Brand';

@Injectable()
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepositoryImpl,
    private brandRepository: BrandsRepositoryImpl,
    private subGroupRepository: SubgroupsRepositoryImpl,
    private pricingRepository: PricingRepositoryImpl,
    private factoringRepository: FactoringRepositoryImpl,
  ) {}

  async validateBrandAndGroup(request: Products) {
    await this.brandRepository.findOne({
      where: { id: request.brand.id },
    });

    await this.subGroupRepository.findOne({
      where: {
        id: request.subGroup.id,
        group: new Group({ id: request.group.id }),
      },
    });
  }

  async findAll({ limit = 10, offset = 0, ...dynamicQuery }: QueryProduct) {
    const pagination = {
      limit: Number(limit),
      offset: Number(offset),
    };

    const whereFilter = {
      status: Status.ACTIVE,
      ...dynamicQuery,
      group: dynamicQuery.group
        ? new Group({ id: dynamicQuery.group })
        : undefined,
      subGroup: dynamicQuery.subGroup
        ? new Subgroup({ id: dynamicQuery.group })
        : undefined,
      brand: dynamicQuery.brand
        ? new Brand({ id: dynamicQuery.group })
        : undefined,
    };

    const total = await this.productsRepository.count({
      where: whereFilter,
    });
    const response = await this.productsRepository.findAll({
      relations: ['group', 'subGroup', 'brand'],
      where: whereFilter,
      take: pagination.limit,
      skip: pagination.offset,
    });

    return {
      response,
      total,
      pagination,
    };
  }

  async findById(request: Products) {
    return await this.productsRepository.findOne(request);
  }

  async create(request: Products) {
    await this.validateBrandAndGroup(request);

    const factoring = await this.factoringRepository.create(request.factoring);

    request.factoring = factoring;

    const pricing = await this.pricingRepository.create(request.pricing);

    request.pricing = pricing;

    const product = await this.productsRepository.create(request);

    return product;
  }

  async update(request: Products) {
    return request;
  }
}
