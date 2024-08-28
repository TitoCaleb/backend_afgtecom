import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from 'src/domain/Provider';
import { NotFoundException } from '@nestjs/common';
import { BankAccount } from 'src/domain/BankAccount';

export class ProvidersRepositoryImpl {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
    @InjectRepository(BankAccount)
    private bankAccountRepository: Repository<BankAccount>,
  ) {}

  async findAll(options?: FindManyOptions<Provider>): Promise<Provider[]> {
    return this.providerRepository.find(options);
  }

  async findById(request: Provider): Promise<Provider> {
    const response = await this.providerRepository.findOne({
      where: { id: request.id },
      relations: [
        'bankAccounts',
        'bankAccounts.bank',
        'providerSectors',
        'providerSectors.businessSector',
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

  async findBankAccountById(request: BankAccount): Promise<BankAccount> {
    const response = await this.bankAccountRepository.findOneBy({
      id: request.id,
    });

    if (!response) {
      throw new NotFoundException('Bank Account not found');
    }

    return response;
  }

  async createBankAccount(request: BankAccount) {
    const response = await this.bankAccountRepository.save(request);
    return response;
  }

  async updateBankAccount(request: BankAccount, bankAccountDb: BankAccount) {
    this.bankAccountRepository.merge(bankAccountDb, request);
    const response = await this.bankAccountRepository.save(bankAccountDb);
    return response;
  }

  async deleteBankAccount(request: BankAccount) {
    await this.bankAccountRepository.delete(request.id);
    return request;
  }
}
