import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessSector } from 'src/domain/BusinessSector';
import { FindManyOptions, Repository } from 'typeorm';

export class BusinessSectorRepositoryImpl {
  constructor(
    @InjectRepository(BusinessSector)
    private businessSectorRepository: Repository<BusinessSector>,
  ) {}

  async findAll(
    options?: FindManyOptions<BusinessSector>,
  ): Promise<BusinessSector[]> {
    const response = await this.businessSectorRepository.find(options);
    return response;
  }

  async findById(request: BusinessSector): Promise<BusinessSector> {
    const response = await this.businessSectorRepository.findOneBy({
      id: request.id,
    });

    if (!response) {
      throw new NotFoundException('Sector not found');
    }

    return response;
  }

  async create(request: BusinessSector) {
    const response = await this.businessSectorRepository.save(request);
    return response;
  }

  async update(request: BusinessSector, sectorDb: BusinessSector) {
    this.businessSectorRepository.merge(sectorDb, request);
    const response = await this.businessSectorRepository.save(sectorDb);
    return response;
  }

  async delete(request: BusinessSector) {
    await this.businessSectorRepository.delete(request.id);
    return request;
  }
}
