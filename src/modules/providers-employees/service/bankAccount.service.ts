import { BankAccount } from 'src/domain/BankAccount';
import { BankAccountRepositoryImpl } from '../repository/bankAccount.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ProvidersRepositoryImpl } from '../repository/providers.repository';
import { Provider } from 'src/domain/Provider';

@Injectable()
export class BankAccountService {
  constructor(
    private bankAccountRepository: BankAccountRepositoryImpl,
    private providerRepository: ProvidersRepositoryImpl,
  ) {}

  async findById(request: Provider) {
    const response =
      await this.bankAccountRepository.findBankAccountByProviderId(request);
    return response;
  }

  async createBankAccount(request: BankAccount) {
    const provider = await this.providerRepository.findById(request.provider);

    if (
      provider.bankAccounts.some(
        (bankAccount) => bankAccount.bank.id === request.bank.id,
      )
    ) {
      throw new BadRequestException('Bank Account already exists');
    }

    const response = await this.bankAccountRepository.create(request);
    return response;
  }

  async updateBankAccount(request: BankAccount) {
    const bankAccountDb = await this.bankAccountRepository.findById(request);

    if (!bankAccountDb) {
      throw new BadRequestException('Bank Account not found');
    }
    bankAccountDb.updatedAt = new Date();
    const response = await this.bankAccountRepository.update(
      request,
      bankAccountDb,
    );
    return response;
  }

  async deleteBankAccount(request: BankAccount) {
    const bankAccountDb = await this.bankAccountRepository.findById(request);

    if (!bankAccountDb) {
      throw new BadRequestException('Bank Account not found');
    }

    const response = await this.bankAccountRepository.delete(request);
    return response;
  }
}
