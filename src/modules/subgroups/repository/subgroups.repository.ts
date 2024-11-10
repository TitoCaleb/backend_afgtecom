import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subgroup } from 'src/domain/Subgroup';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

export class SubgroupsRepositoryImpl {
  constructor(
    @InjectRepository(Subgroup)
    private subgroupRepository: Repository<Subgroup>,
  ) {}

  async findAll(options?: FindManyOptions<Subgroup>): Promise<Subgroup[]> {
    const response = await this.subgroupRepository.find(options);
    return response;
  }

  async findOne(options: FindOneOptions<Subgroup>): Promise<Subgroup> {
    const response = await this.subgroupRepository.findOne(options);

    if (!response) {
      throw new NotFoundException('Subgroup not found');
    }

    return response;
  }

  async create(request: Subgroup) {
    const response = await this.subgroupRepository.save(request);
    return response;
  }

  async update(request: Subgroup, lineDb: Subgroup) {
    this.subgroupRepository.merge(lineDb, request);
    await this.subgroupRepository.save(lineDb);

    const response = await this.subgroupRepository.findOne({
      where: { id: lineDb.id },
    });

    return response;
  }

  async delete(request: Subgroup) {
    await this.subgroupRepository.delete(request.id);
    return request;
  }
}
