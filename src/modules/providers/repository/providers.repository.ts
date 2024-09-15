import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from 'src/domain/Provider';
import { NotFoundException } from '@nestjs/common';

export class ProvidersRepositoryImpl {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {}

  async count(options?: FindManyOptions<Provider>): Promise<number> {
    const response = await this.providerRepository.count(options);
    return response;
  }

  async findAll(options?: FindManyOptions<Provider>): Promise<Provider[]> {
    const response = await this.providerRepository.find(options);
    return response;
  }

  async findById(request: Provider): Promise<Provider> {
    const response = await this.providerRepository.findOne({
      where: { id: request.id },
      relations: [
        'bankAccounts',
        'bankAccounts.bank',
        'employees',
        'paymentTerm',
        'businessSector',
        'country',
      ],
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
    Object.assign(providerDb, request);
    const response = await this.providerRepository.save(providerDb);
    return response;
  }

  async delete(request: Provider) {
    await this.providerRepository.delete(request.id);
    return request;
  }
}
