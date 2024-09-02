import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepositoryImpl } from '../repository/categories.repository';
import { Category } from 'src/domain/Category';
import { In } from 'typeorm';
import { Status } from 'src/utils/enums';

@Injectable()
export class CategoriesService {
  constructor(private categoryRepository: CategoriesRepositoryImpl) {}

  async findAll() {
    return await this.categoryRepository.findAll({
      where: {
        status: In([Status.ACTIVE, Status.INACTIVE]),
      },
    });
  }

  async findById(category: Category) {
    const categoryDb = await this.categoryRepository.findOne({
      where: { id: category.id },
    });

    if (!categoryDb) {
      throw new NotFoundException('Category not found');
    }

    return categoryDb;
  }

  async create(category: Category) {
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: category.name, status: Status.DELETED },
    });

    if (existingCategory) {
      category.id = existingCategory.id;
      category.status = Status.ACTIVE;
      category.updatedAt = new Date();
      return await this.categoryRepository.update(category, existingCategory);
    }

    return await this.categoryRepository.create(category);
  }

  async update(category: Category) {
    const categoryDb = await this.categoryRepository.findOne({
      where: { id: category.id },
    });
    categoryDb.updatedAt = new Date();
    return await this.categoryRepository.update(category, categoryDb);
  }

  async delete(category: Category) {
    const categoryDb = await this.categoryRepository.findOne({
      where: { id: category.id },
    });

    if (categoryDb.status === Status.ACTIVE) {
      throw new HttpException('Category cannot be deleted', 400);
    }

    const newCategory = new Category({
      ...categoryDb,
      status: Status.DELETED,
      updatedAt: new Date(),
    });

    return await this.categoryRepository.update(newCategory, categoryDb);
  }
}
