import { InjectRepository } from '@nestjs/typeorm';
import { ProviderSector } from 'src/domain/ProviderSector';
import { Repository } from 'typeorm';

export class ProviderSectorRepositoryImpl {
  constructor(
    @InjectRepository(ProviderSector)
    private providerSectorRepository: Repository<ProviderSector>,
  ) {}

  async createProviderSector(request: ProviderSector) {
    const response = await this.providerSectorRepository.save(request);
    return response;
  }
}
