import { HttpException, Injectable } from '@nestjs/common';
import { Status } from 'src/utils/enums';
import { ProductsRepositoryImpl } from '../repository/products.repository';
import { Products, QueryProduct } from 'src/domain/Products';
import { SubgroupsRepositoryImpl } from 'src/modules/subgroups/repository/subgroups.repository';
import { BrandsRepositoryImpl } from 'src/modules/brands/repository/brands.repository';
import { PricingRepositoryImpl } from '../repository/pricing.repository';
import { FactoringRepositoryImpl } from '../repository/factoring.repository';
import { Brand } from 'src/domain/Brand';
import { GroupsRepositoryImpl } from 'src/modules/groups/repository/groups.repository';

@Injectable()
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepositoryImpl,
    private brandRepository: BrandsRepositoryImpl,
    private groupRepository: GroupsRepositoryImpl,
    private subGroupRepository: SubgroupsRepositoryImpl,
    private pricingRepository: PricingRepositoryImpl,
    private factoringRepository: FactoringRepositoryImpl,
  ) {}

  async validateBrandsAndGroup(request: Products) {
    const brandExists = await this.brandRepository.findOne({
      where: { id: request.brand.id },
    });

    if (!brandExists) {
      throw new Error('Brand not found');
    }

    const groupExists = await this.groupRepository.findOne({
      where: {
        id: request.group.id,
        brand: { id: request.brand.id },
      },
    });

    if (!groupExists) {
      throw new Error('Group not found or does not belong to the brand');
    }

    const subGroupExists = await this.subGroupRepository.findOne({
      where: {
        id: request.subGroup.id,
        group: { id: request.group.id },
      },
    });

    if (!subGroupExists) {
      throw new Error('SubGroup not found or does not belong to the group');
    }
  }

  async findAll({ limit = 10, offset = 0, ...dynamicQuery }: QueryProduct) {
    const pagination = {
      limit: Number(limit),
      offset: Number(offset),
    };

    const whereFilter = {
      status: Status.ACTIVE,
      ...dynamicQuery,
      brand: dynamicQuery.brand
        ? new Brand({ id: dynamicQuery.brand })
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
    await this.validateBrandsAndGroup(request);

    const factoring = await this.factoringRepository.create(request.factoring);

    request.factoring = factoring;

    const pricing = await this.pricingRepository.create(request.pricing);

    request.pricing = pricing;

    const product = await this.productsRepository.create(request);

    return product;
  }

  async update(request: Products) {
    const productDb = await this.productsRepository.findOne(request);

    if (request.validateBrandsAndGroup()) {
      await this.validateBrandsAndGroup(
        new Products({
          ...productDb,
          ...request,
        }),
      );
    }

    productDb.updatedAt = new Date();

    return await this.productsRepository.update(request, productDb);
  }

  async delete(request: Products) {
    const productDb = await this.productsRepository.findOne(request);

    if (productDb.status === Status.ACTIVE) {
      throw new HttpException('Product cannot be deleted', 400);
    }

    const product = new Products(productDb);
    product.updatedAt = new Date();
    product.status = Status.DELETED;

    return await this.productsRepository.update(request, product);
  }
}
