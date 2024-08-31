import { Injectable } from '@nestjs/common';
import { ProvidersRepositoryImpl } from '../repository/providers.repository';
import { Provider } from 'src/domain/Provider';
import { BankAccount } from 'src/domain/BankAccount';
import { BanksRepositoryImpl } from 'src/modules/banks/repository/banks.repository';
import { BusinessSectorRepositoryImpl } from 'src/modules/business-sector/repository/business-sector.repository';
import { BusinessSector } from 'src/domain/BusinessSector';
import { ProviderSector } from 'src/domain/ProviderSector';
import { ProviderSectorRepositoryImpl } from '../repository/providerSector.repository';
import { EmployeesRepositoryImpl } from '../repository/employees.repository';
import { BankAccountRepositoryImpl } from '../repository/bankAccount.repository';

@Injectable()
export class ProvidersService {
  constructor(
    private providersRepository: ProvidersRepositoryImpl,
    private banksRepository: BanksRepositoryImpl,
    private businessSectorRepository: BusinessSectorRepositoryImpl,
    private providerSectorRepository: ProviderSectorRepositoryImpl,
    private employeesRepository: EmployeesRepositoryImpl,
    private bankAccountsRepository: BankAccountRepositoryImpl,
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

    const provider = await this.providersRepository.create(request);

    if (request.businessSector.length) {
      await Promise.all(
        request.businessSector.map(async (businessSector) => {
          return await this.providerSectorRepository.createProviderSector(
            new ProviderSector({
              provider: provider,
              businessSector,
            }),
          );
        }),
      );
    }

    provider.businessSector = request.businessSector;
    return provider;
  }

  async update(request: Provider) {
    const providerDb = await this.providersRepository.findById(request);

    const requestBusinessSector = new Set(
      request.providerSectors.map((businessSector) => businessSector.id),
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

    if (providerDb.employees.length) {
      Promise.all(
        providerDb.employees.map((employee) => {
          this.employeesRepository.delete(employee);
        }),
      );
    }

    if (providerDb.bankAccounts.length) {
      Promise.all(
        providerDb.bankAccounts.map((bankAccount) => {
          this.bankAccountsRepository.delete(bankAccount);
        }),
      );
    }

    if (providerDb.providerSectors.length) {
      Promise.all(
        providerDb.providerSectors.map((providerSector) => {
          this.providerSectorRepository.delete(providerSector);
        }),
      );
    }

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

    const response = await this.bankAccountsRepository.create(request);

    return response;
  }
}
