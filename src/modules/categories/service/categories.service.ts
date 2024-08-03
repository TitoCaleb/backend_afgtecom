import { Injectable } from '@nestjs/common';
import { CategoriesRepositoryImpl } from '../repository/categories.repository';
import { Category } from 'src/domain/Category';

@Injectable()
export class CategoriesService {
  constructor(private categoryRepository: CategoriesRepositoryImpl) {}

  async findAll() {
    return await this.categoryRepository.findAll();
  }

  async findById(category: Category) {
    return await this.categoryRepository.findById(category);
  }

  async create(category: Category) {
    return await this.categoryRepository.create(category);
  }

  async update(category: Category) {
    const categoryDb = await this.categoryRepository.findById(category);
    return await this.categoryRepository.update(category, categoryDb);
  }

  async delete(category: Category) {
    const categoryDb = await this.categoryRepository.findById(category);
    return await this.categoryRepository.delete(categoryDb);
  }
}
