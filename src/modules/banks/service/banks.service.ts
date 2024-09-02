import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { BanksRepositoryImpl } from '../repository/banks.repository';
import { Bank } from 'src/domain/Banks';
import { In } from 'typeorm';
import { Status } from 'src/utils/enums';

@Injectable()
export class BanksService {
  constructor(private banksRepository: BanksRepositoryImpl) {}

  async findAll() {
    return await this.banksRepository.findAll({
      where: {
        status: In([Status.ACTIVE, Status.INACTIVE]),
      },
    });
  }

  async findById(bank: Bank) {
    const bankDb = await this.banksRepository.findOne({
      where: { id: bank.id },
    });

    if (!bankDb) {
      throw new NotFoundException('Bank not found');
    }

    return bankDb;
  }

  async create(bank: Bank) {
    const existingBank = await this.banksRepository.findOne({
      where: { name: bank.name, status: Status.DELETED },
    });

    if (existingBank) {
      bank.id = existingBank.id;
      bank.status = Status.ACTIVE;
      bank.updatedAt = new Date();
      return await this.banksRepository.update(bank, existingBank);
    }

    return await this.banksRepository.create(bank);
  }

  async update(bank: Bank) {
    const bankDb = await this.banksRepository.findOne({
      where: { id: bank.id },
    });
    bankDb.updatedAt = new Date();
    return await this.banksRepository.update(bank, bankDb);
  }

  async delete(bank: Bank) {
    const bankDb = await this.banksRepository.findOne({
      where: { id: bank.id },
    });

    if (bankDb.status === Status.ACTIVE) {
      throw new HttpException('Bank cannot be deleted', 400);
    }

    const newBank = new Bank({
      ...bankDb,
      status: Status.DELETED,
      updatedAt: new Date(),
    });

    return await this.banksRepository.update(newBank, bankDb);
  }
}
