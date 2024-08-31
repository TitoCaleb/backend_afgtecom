/* import { NotFoundException } from '@nestjs/common'; */
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/domain/Brand';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

export class BrandsRepositoryImpl {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  async findAll(options?: FindManyOptions<Brand>): Promise<Brand[]> {
    const response = await this.brandRepository.find(options);
    return response;
  }

  async findOne(options: FindOneOptions<Brand>): Promise<Brand> {
    const response = await this.brandRepository.findOne(options);

    return response;
  }

  async create(request: Brand) {
    const response = await this.brandRepository.save(request);
    return response;
  }

  async update(request: Brand, brandDb: Brand) {
    this.brandRepository.merge(brandDb, request);
    const response = await this.brandRepository.save(brandDb);
    return response;
  }

  async delete(request: Brand) {
    await this.brandRepository.delete(request.id);
    return request;
  }
}
