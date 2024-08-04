import { Injectable } from '@nestjs/common';
import { ProvidersRepositoryImpl } from '../repository/providers.repository';
import { Provider } from 'src/domain/Provider';
import { BankAccount } from 'src/domain/BankAccount';
import { BanksRepositoryImpl } from 'src/modules/banks/repository/banks.repository';

@Injectable()
export class ProvidersService {
  constructor(
    private providersRepository: ProvidersRepositoryImpl,
    private banksRepository: BanksRepositoryImpl,
  ) {}

  async findAll() {
    return await this.providersRepository.findAll({
      relations: ['bankAccounts'],
    });
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

  async createBankAccount(request: BankAccount) {
    const providerDb = await this.providersRepository.findById(
      request.provider,
    );

    await this.banksRepository.findById(request.bank);

    if (
      providerDb.bankAccounts.some(
        (banksAccount) => banksAccount.bank.id === request.bank.id,
      )
    ) {
      throw new Error('Bank Account already exists');
    }

    const response = await this.providersRepository.createBankAccount(request);

    return response;
  }
}
