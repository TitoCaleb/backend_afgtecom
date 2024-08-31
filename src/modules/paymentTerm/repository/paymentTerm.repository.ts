import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentTerm } from 'src/domain/PaymentTerm';
import { FindManyOptions, Repository } from 'typeorm';

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

  async findById(request: PaymentTerm): Promise<PaymentTerm> {
    const response = await this.paymentTermRepository.findOneBy({
      id: request.id,
    });

    if (!response) {
      throw new NotFoundException('PaymentTerm not found');
    }

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
