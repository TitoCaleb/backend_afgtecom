import { Injectable } from '@nestjs/common';
import { BaseRepositoryImpl } from '../repository/base.repository';
import { Department } from 'src/domain/Ubigeo/Department';
import { Province } from 'src/domain/Ubigeo/Province';

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

  async findAllDepartment() {
    return await this.baseRepository.findAllDepartment();
  }

  async findProvinceByDepartmentId(department: Department) {
    return await this.baseRepository.findProvinceByDepartmentId(department);
  }

  async findDistrictByProvinceId(province: Province) {
    return await this.baseRepository.findDistrictByProvinceId(province);
  }
}