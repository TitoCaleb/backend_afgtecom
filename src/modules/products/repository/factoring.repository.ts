import { InjectRepository } from '@nestjs/typeorm';
import { Factoring } from 'src/domain/Factoring';
import { FindOneOptions, Repository } from 'typeorm';

export class FactoringRepositoryImpl {
  constructor(
    @InjectRepository(Factoring)
    private factoringDbRepository: Repository<Factoring>,
  ) {}

  async findOne(options: FindOneOptions<Factoring>): Promise<Factoring> {
    const response = await this.factoringDbRepository.findOne(options);
    return response;
  }

  async create(request: Factoring) {
    const response = await this.factoringDbRepository.save(request);
    return response;
  }

  async update(request: Factoring, factoringDb: Factoring) {
    Object.assign(request, factoringDb);
    const response = await this.factoringDbRepository.save(factoringDb);
    return response;
  }
}
