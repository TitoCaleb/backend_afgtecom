import { Injectable } from '@nestjs/common';
import { PaymentTermRepositoryImpl } from '../repository/paymentTerm.repository';
import { PaymentTerm } from 'src/domain/PaymentTerm';

@Injectable()
export class PaymentTermService {
  constructor(private paymentTermRepository: PaymentTermRepositoryImpl) {}

  async findAll() {
    return await this.paymentTermRepository.findAll();
  }

  async findById(paymentTerm: PaymentTerm) {
    return await this.paymentTermRepository.findById(paymentTerm);
  }

  async create(paymentTerm: PaymentTerm) {
    return await this.paymentTermRepository.create(paymentTerm);
  }

  async update(paymentTerm: PaymentTerm) {
    const paymentTermDb =
      await this.paymentTermRepository.findById(paymentTerm);

    paymentTermDb.updatedAt = new Date();
    return await this.paymentTermRepository.update(paymentTerm, paymentTermDb);
  }

  async delete(paymentTerm: PaymentTerm) {
    const paymentTermDb =
      await this.paymentTermRepository.findById(paymentTerm);
    return await this.paymentTermRepository.delete(paymentTermDb);
  }
}
