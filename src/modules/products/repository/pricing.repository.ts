import { InjectRepository } from '@nestjs/typeorm';
import { Pricing } from 'src/domain/Pricing';
import { FindOneOptions, Repository } from 'typeorm';

export class PricingRepositoryImpl {
  constructor(
    @InjectRepository(Pricing) private pricingRepository: Repository<Pricing>,
  ) {}

  async findOne(options: FindOneOptions<Pricing>): Promise<Pricing> {
    const response = await this.pricingRepository.findOne(options);
    return response;
  }

  async create(request: Pricing) {
    const response = await this.pricingRepository.save(request);
    return response;
  }

  async update(request: Pricing, pricingDb: Pricing) {
    Object.assign(request, pricingDb);
    const response = await this.pricingRepository.save(pricingDb);
    return response;
  }
}
