import { InjectRepository } from '@nestjs/typeorm';
import { PaymentTerm } from 'src/domain/PaymentTerm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

export class PaymentTermRepositoryImpl {
  constructor(
    @InjectRepository(PaymentTerm)
    private paymentTermRepository: Repository<PaymentTerm>,
  ) {}

  async findAll(
    options?: FindManyOptions<PaymentTerm>,
  ): Promise<PaymentTerm[]> {
    const response = await this.paymentTermRepository.find(options);
    return response;
  }

  async findOne(options: FindOneOptions<PaymentTerm>): Promise<PaymentTerm> {
    const response = await this.paymentTermRepository.findOne(options);

    return response;
  }

  async create(request: PaymentTerm) {
    const response = await this.paymentTermRepository.save(request);
    return response;
  }

  async update(request: PaymentTerm, paymentTermDb: PaymentTerm) {
    Object.assign(paymentTermDb, request);
    await this.paymentTermRepository.save(paymentTermDb);

    return request;
  }

  async delete(request: PaymentTerm) {
    await this.paymentTermRepository.delete(request.id);
    return request;
  }
}
