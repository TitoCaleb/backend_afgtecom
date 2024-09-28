import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccount } from 'src/domain/BankAccount';
import { Provider } from 'src/domain/Provider';
import { Repository } from 'typeorm';

export class BankAccountRepositoryImpl {
  constructor(
    @InjectRepository(BankAccount)
    private bankAccountRepository: Repository<BankAccount>,
  ) {}

  async findById(request: BankAccount): Promise<BankAccount> {
    const response = await this.bankAccountRepository.findOneBy({
      id: request.id,
    });

    if (!response) {
      throw new NotFoundException('Bank Account not found');
    }

    return response;
  }

  async findBankAccountByProviderId(request: Provider): Promise<BankAccount[]> {
    const response = await this.bankAccountRepository.find({
      where: {
        provider: {
          id: request.id,
        },
      },
      relations: ['bank'],
    });

    return response;
  }

  async create(request: BankAccount) {
    const response = await this.bankAccountRepository.save(request);
    return response;
  }

  async update(request: BankAccount, bankAccountDb: BankAccount) {
    this.bankAccountRepository.merge(bankAccountDb, request);
    const response = await this.bankAccountRepository.save(bankAccountDb);
    return response;
  }

  async delete(request: BankAccount) {
    await this.bankAccountRepository.delete(request.id);
    return request;
  }
}
