import { InjectRepository } from '@nestjs/typeorm';
import { Phone } from 'src/domain/Phone';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

export class PhoneRepositoryImpl {
  constructor(
    @InjectRepository(Phone) private phoneRepository: Repository<Phone>,
  ) {}

  async findAll(options?: FindManyOptions<Phone>): Promise<Phone[]> {
    const response = await this.phoneRepository.find(options);
    return response;
  }

  async findOne(options: FindOneOptions<Phone>): Promise<Phone> {
    const response = await this.phoneRepository.findOne(options);
    return response;
  }

  async create(request: Phone) {
    const response = await this.phoneRepository.save(request);
    return response;
  }

  async update(request: Phone, phoneDb: Phone) {
    Object.assign(phoneDb, request);
    await this.phoneRepository.save(phoneDb);

    return request;
  }

  async delete(request: Phone) {
    await this.phoneRepository.delete(request.id);
    return request;
  }
}
