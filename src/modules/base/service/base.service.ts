import { Injectable } from '@nestjs/common';
import { BaseRepositoryImpl } from '../repository/base.repository';

@Injectable()
export class BaseService {
  constructor(private baseRepository: BaseRepositoryImpl) {}

  async findAllDocumentType() {
    return await this.baseRepository.findAllDocumentType();
  }
  async findAllCivilStatus() {
    return await this.baseRepository.findAllCivilStatus();
  }
  async findAllRol() {
    return await this.baseRepository.findAllRol();
  }
}
