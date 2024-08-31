import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { BrandsRepositoryImpl } from '../repository/brands.repository';
import { Brand } from 'src/domain/Brand';
import { Status } from 'src/utils/enums';
import { In } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(private brandsRepository: BrandsRepositoryImpl) {}

  async findAll() {
    return await this.brandsRepository.findAll({
      where: {
        status: In([Status.ACTIVE, Status.INACTIVE]),
      },
    });
  }

  async findById(brand: Brand) {
    const brandDb = await this.brandsRepository.findOne({
      where: { id: brand.id },
    });

    if (!brandDb) {
      throw new NotFoundException('Brand not found');
    }

    return brandDb;
  }

  async create(brand: Brand) {
    const existingBrand = await this.brandsRepository.findOne({
      where: { name: brand.name, status: Status.DELETED },
    });

    if (existingBrand) {
      brand.id = existingBrand.id;
      brand.status = Status.ACTIVE;
      brand.updatedAt = new Date();
      return await this.brandsRepository.update(brand, existingBrand);
    }

    return await this.brandsRepository.create(brand);
  }

  async update(brand: Brand) {
    const brandDb = await this.brandsRepository.findOne({
      where: { id: brand.id },
    });
    brandDb.updatedAt = new Date();
    return await this.brandsRepository.update(brand, brandDb);
  }

  async delete(brand: Brand) {
    const brandDb = await this.brandsRepository.findOne({
      where: { id: brand.id },
    });

    if (brandDb.status === Status.ACTIVE) {
      throw new HttpException('Brand cannot be deleted', 400);
    }

    const newBrand = new Brand({
      ...brandDb,
      status: Status.DELETED,
      updatedAt: new Date(),
    });

    return await this.brandsRepository.update(newBrand, brandDb);
  }
}
