import { InjectRepository } from '@nestjs/typeorm';
import { BusinessSector } from 'src/domain/BusinessSector';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

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

  async findOne(
    options: FindOneOptions<BusinessSector>,
  ): Promise<BusinessSector> {
    const response = await this.businessSectorRepository.findOne(options);
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
