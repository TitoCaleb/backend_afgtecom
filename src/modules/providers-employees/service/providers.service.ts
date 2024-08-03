import { Injectable } from '@nestjs/common';
import { ProvidersRepositoryImpl } from '../repository/providers.repository';
import { Provider } from 'src/domain/Provider';

@Injectable()
export class ProvidersService {
  constructor(private providersRepository: ProvidersRepositoryImpl) {}

  async findAll() {
    return await this.providersRepository.findAll();
  }

  async findById(request: Provider) {
    return await this.providersRepository.findById(request);
  }

  async create(request: Provider) {
    return await this.providersRepository.create(request);
  }

  async update(request: Provider) {
    const providerDb = await this.providersRepository.findById(request);
    return await this.providersRepository.update(request, providerDb);
  }

  async delete(request: Provider) {
    const providerDb = await this.providersRepository.findById(request);
    return await this.providersRepository.delete(providerDb);
  }
}
