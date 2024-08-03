import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/domain/Category';
import { FindManyOptions, Repository } from 'typeorm';

export class CategoriesRepositoryImpl {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(options?: FindManyOptions<Category>): Promise<Category[]> {
    return this.categoryRepository.find(options);
  }

  async findById(request: Category): Promise<Category> {
    const response = await this.categoryRepository.findOneBy({
      id: request.id,
    });

    if (!response) {
      throw new NotFoundException('Category not found');
    }

    return response;
  }

  async create(request: Category): Promise<Category> {
    const response = await this.categoryRepository.save(request);
    return response;
  }

  async update(request: Category, dbCategory: Category): Promise<Category> {
    this.categoryRepository.merge(dbCategory, request);
    const response = await this.categoryRepository.save(dbCategory);
    return response;
  }

  async delete(request: Category): Promise<Category> {
    await this.categoryRepository.delete(request.id);
    return request;
  }
}
