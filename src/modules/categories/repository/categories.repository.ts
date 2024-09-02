import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/domain/Category';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

export class CategoriesRepositoryImpl {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(options?: FindManyOptions<Category>): Promise<Category[]> {
    return this.categoryRepository.find(options);
  }

  async findOne(options: FindOneOptions<Category>): Promise<Category> {
    const response = await this.categoryRepository.findOne(options);

    return response;
  }

  async create(request: Category): Promise<Category> {
    const response = await this.categoryRepository.save(request);
    return response;
  }

  async update(request: Category, categoryDb: Category): Promise<Category> {
    this.categoryRepository.merge(categoryDb, request);
    const response = await this.categoryRepository.save(categoryDb);
    return response;
  }

  async delete(request: Category): Promise<Category> {
    await this.categoryRepository.delete(request.id);
    return request;
  }
}
