import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from 'src/domain/Banks';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

export class BanksRepositoryImpl {
  constructor(
    @InjectRepository(Bank) private bankRepository: Repository<Bank>,
  ) {
    this.bankRepository = bankRepository;
  }
  async findAll(options?: FindManyOptions<Bank>) {
    const response = await this.bankRepository.find(options);
    return response;
  }

  async findOne(options: FindOneOptions<Bank>) {
    const response = await this.bankRepository.findOne(options);
    return response;
  }

  async create(request: Bank) {
    const response = await this.bankRepository.save(request);
    return response;
  }

  async update(request: Bank, bankDb: Bank) {
    this.bankRepository.merge(bankDb, request);
    const response = await this.bankRepository.save(bankDb);
    return response;
  }

  async delete(request: Bank) {
    await this.bankRepository.delete(request.id);
    return request;
  }
}
