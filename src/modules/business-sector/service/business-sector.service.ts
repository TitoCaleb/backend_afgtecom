import { Injectable } from '@nestjs/common';
import { BusinessSectorRepositoryImpl } from '../repository/business-sector.repository';
import { BusinessSector } from 'src/domain/BusinessSector';

@Injectable()
export class BusinessSectorService {
  constructor(private businessSectorRepository: BusinessSectorRepositoryImpl) {}

  async findAll() {
    return await this.businessSectorRepository.findAll();
  }

  async findById(sector: BusinessSector) {
    return await this.businessSectorRepository.findById(sector);
  }

  async create(sector: BusinessSector) {
    return await this.businessSectorRepository.create(sector);
  }

  async update(sector: BusinessSector) {
    const sectorDb = await this.businessSectorRepository.findById(sector);

    return await this.businessSectorRepository.update(sector, sectorDb);
  }

  async delete(sector: BusinessSector) {
    const sectorDb = await this.businessSectorRepository.findById(sector);
    return await this.businessSectorRepository.delete(sectorDb);
  }
}
