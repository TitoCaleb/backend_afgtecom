import { Injectable } from '@nestjs/common';
import { ProvidersRepositoryImpl } from '../repository/providers.repository';
import { Provider } from 'src/domain/Provider';
import { BankAccount } from 'src/domain/BankAccount';
import { BanksRepositoryImpl } from 'src/modules/banks/repository/banks.repository';
import { BusinessSectorRepositoryImpl } from 'src/modules/business-sector/repository/business-sector.repository';
import { BusinessSector } from 'src/domain/BusinessSector';

@Injectable()
export class ProvidersService {
  constructor(
    private providersRepository: ProvidersRepositoryImpl,
    private banksRepository: BanksRepositoryImpl,
    private businessSectorRepository: BusinessSectorRepositoryImpl,
  ) {}

  async findAll() {
    return await this.providersRepository.findAll();
  }

  async findById(request: Provider) {
    return await this.providersRepository.findById(request);
  }

  async create(request: Provider) {
    const requestBusinessSector = new Set(
      request.businessSector.map((businessSector) => businessSector.id),
    );

    await Promise.all(
      Array.from(requestBusinessSector).map(async (id) => {
        await this.businessSectorRepository.findById(
          new BusinessSector({ id }),
        );
      }),
    );

    return await this.providersRepository.create(request);
  }

  async update(request: Provider) {
    const providerDb = await this.providersRepository.findById(request);

    const requestBusinessSector = new Set(
      request.businessSector.map((businessSector) => businessSector.id),
    );

    await Promise.all(
      Array.from(requestBusinessSector).map(async (id) => {
        await this.businessSectorRepository.findById(
          new BusinessSector({ id }),
        );
      }),
    );

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
