import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from 'src/domain/Provider';
import { NotFoundException } from '@nestjs/common';

export class ProvidersRepositoryImpl {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {}

  async findAll(options?: FindManyOptions<Provider>): Promise<Provider[]> {
    return this.providerRepository.find(options);
  }

  async findById(request: Provider): Promise<Provider> {
    const response = await this.providerRepository.findOneBy({
      id: request.id,
    });

    if (!response) {
      throw new NotFoundException('Provider not found');
    }

    return response;
  }

  async create(request: Provider) {
    const response = await this.providerRepository.save(request);
    return response;
  }

  async update(request: Provider, providerDb: Provider) {
    this.providerRepository.merge(providerDb, request);
    const response = await this.providerRepository.save(providerDb);
    return response;
  }

  async delete(request: Provider) {
    await this.providerRepository.delete(request.id);
    return request;
  }
}
