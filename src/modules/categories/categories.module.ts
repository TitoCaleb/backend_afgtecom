import { Module } from '@nestjs/common';
import { CategoriesController } from './controller/categories.controller';
import { CategoriesService } from './service/categories.service';
import { CategoriesRepositoryImpl } from './repository/categories.repository';
import { Category } from 'src/domain/Category';
import { Device } from 'src/domain/Device';
import { Client } from 'src/domain/Client';
import { Token } from 'src/domain/Token';
import { SecurityRepositoryImpl } from '../security/repository/security.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Device, Client, Token])],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    CategoriesRepositoryImpl,
    SecurityRepositoryImpl,
  ],
})
export class CategoriesModule {}
