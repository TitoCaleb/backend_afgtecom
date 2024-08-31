import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { BusinessSectorRepositoryImpl } from '../repository/business-sector.repository';
import { BusinessSector } from 'src/domain/BusinessSector';
import { In } from 'typeorm';
import { Status } from 'src/utils/enums';

@Injectable()
export class BusinessSectorService {
  constructor(private businessSectorRepository: BusinessSectorRepositoryImpl) {}

  async findAll() {
    return await this.businessSectorRepository.findAll({
      where: {
        status: In([Status.ACTIVE, Status.INACTIVE]),
      },
    });
  }

  async findById(sector: BusinessSector) {
    const sectorDb = await this.businessSectorRepository.findOne({
      where: { id: sector.id },
    });

    if (!sectorDb) {
      throw new NotFoundException('Business sector not found');
    }

    return sectorDb;
  }

  async create(sector: BusinessSector) {
    const existingSector = await this.businessSectorRepository.findOne({
      where: { id: sector.id },
    });

    if (existingSector) {
      sector.id = existingSector.id;
      sector.status = Status.ACTIVE;
      sector.updatedAt = new Date();
      return await this.businessSectorRepository.update(sector, existingSector);
    }

    return await this.businessSectorRepository.create(sector);
  }

  async update(sector: BusinessSector) {
    const sectorDb = await this.businessSectorRepository.findOne({
      where: { id: sector.id },
    });
    sectorDb.updatedAt = new Date();
    return await this.businessSectorRepository.update(sector, sectorDb);
  }

  async delete(sector: BusinessSector) {
    const sectorDb = await this.businessSectorRepository.findOne({
      where: { id: sector.id },
    });

    if (sectorDb.status === Status.ACTIVE) {
      throw new HttpException('Bank cannot be deleted', 400);
    }

    const newSector = new BusinessSector({
      ...sectorDb,
      status: Status.DELETED,
      updatedAt: new Date(),
    });

    return await this.businessSectorRepository.update(newSector, sectorDb);
  }
}
