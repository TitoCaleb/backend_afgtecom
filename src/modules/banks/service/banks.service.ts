import { Injectable } from '@nestjs/common';
import { BanksRepositoryImpl } from '../repository/banks.repository';
import { Bank } from 'src/domain/Banks';

@Injectable()
export class BanksService {
  constructor(private banksRepository: BanksRepositoryImpl) {}

  async findAll() {
    return await this.banksRepository.findAll();
  }

  async findById(bank: Bank) {
    return await this.banksRepository.findById(bank);
  }

  async create(bank: Bank) {
    return await this.banksRepository.create(bank);
  }

  async update(bank: Bank) {
    const bankDb = await this.banksRepository.findById(bank);
    return await this.banksRepository.update(bank, bankDb);
  }

  async delete(bank: Bank) {
    const bankDb = await this.banksRepository.findById(bank);
    return await this.banksRepository.delete(bankDb);
  }
}
