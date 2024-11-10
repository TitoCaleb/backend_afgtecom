import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/domain/Products';
import { FindManyOptions, Repository } from 'typeorm';

export class ProductsRepositoryImpl {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async count(options?: FindManyOptions<Products>): Promise<number> {
    const response = await this.productsRepository.count(options);
    return response;
  }

  async findAll(options?: FindManyOptions<Products>): Promise<Products[]> {
    const response = await this.productsRepository.find(options);
    return response;
  }

  async findOne(request: Products): Promise<Products> {
    const response = await this.productsRepository.findOne({
      where: { id: request.id },
      relations: ['group', 'subGroup', 'brand', 'factoring', 'pricing'],
    });

    if (!response) {
      throw new NotFoundException('Product not found');
    }

    return response;
  }

  async create(request: Products) {
    const response = await this.productsRepository.save(request);
    return response;
  }

  async update(request: Products, productDb: Products) {
    Object.assign(productDb, request);
    const response = await this.productsRepository.save(productDb);
    return response;
  }

  async delete(request: Products) {
    await this.productsRepository.delete(request.id);
    return request;
  }
}
