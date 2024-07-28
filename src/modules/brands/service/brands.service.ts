import { HttpException, Injectable } from '@nestjs/common';
import { BrandsRepositoryImpl } from '../repository/brands.repository';
import { Brand, BrandStatus } from 'src/domain/Brand';

@Injectable()
export class BrandsService {
  constructor(private brandsRepository: BrandsRepositoryImpl) {}

  async findAll() {
    return await this.brandsRepository.findAll();
  }

  async findById(brand: Brand) {
    return await this.brandsRepository.findById(brand);
  }

  async create(brand: Brand) {
    const newBrand = new Brand({
      ...brand,
      name: brand.name.toLocaleUpperCase(),
    });
    return await this.brandsRepository.create(newBrand);
  }

  async update(brand: Brand) {
    const brandDb = await this.brandsRepository.findById(brand);
    brand.updateAt = new Date();
    return await this.brandsRepository.update(brand, brandDb);
  }

  async delete(brand: Brand) {
    const brandDb = await this.brandsRepository.findById(brand);

    if (brandDb.getStatus() === BrandStatus.ACTIVE) {
      throw new HttpException('Brand cannot be deleted', 400);
    }

    return await this.brandsRepository.delete(brandDb);
  }
}
