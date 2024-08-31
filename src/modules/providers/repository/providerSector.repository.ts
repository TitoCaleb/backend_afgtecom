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

  async delete(request: ProviderSector) {
    await this.providerSectorRepository.delete(request.id);
    return request;
  }
}
