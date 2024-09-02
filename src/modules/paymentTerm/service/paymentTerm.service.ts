import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PaymentTermRepositoryImpl } from '../repository/paymentTerm.repository';
import { PaymentTerm } from 'src/domain/PaymentTerm';
import { In } from 'typeorm';
import { Status } from 'src/utils/enums';

@Injectable()
export class PaymentTermService {
  constructor(private paymentTermRepository: PaymentTermRepositoryImpl) {}

  async findAll() {
    return await this.paymentTermRepository.findAll({
      where: {
        status: In([Status.ACTIVE, Status.INACTIVE]),
      },
    });
  }

  async findById(paymentTerm: PaymentTerm) {
    const paymentTermDb = await this.paymentTermRepository.findOne({
      where: { id: paymentTerm.id },
    });

    if (!paymentTermDb) {
      throw new NotFoundException('PaymentTerm not found');
    }

    return paymentTermDb;
  }

  async create(paymentTerm: PaymentTerm) {
    const existingPaymentTerm = await this.paymentTermRepository.findOne({
      where: { condition: paymentTerm.condition, status: Status.DELETED },
    });

    if (existingPaymentTerm) {
      paymentTerm.id = existingPaymentTerm.id;
      paymentTerm.status = Status.ACTIVE;
      paymentTerm.updatedAt = new Date();
      return await this.paymentTermRepository.update(
        paymentTerm,
        existingPaymentTerm,
      );
    }

    return await this.paymentTermRepository.create(paymentTerm);
  }

  async update(paymentTerm: PaymentTerm) {
    const paymentTermDb = await this.paymentTermRepository.findOne({
      where: { id: paymentTerm.id },
    });

    paymentTermDb.updatedAt = new Date();
    return await this.paymentTermRepository.update(paymentTerm, paymentTermDb);
  }

  async delete(paymentTerm: PaymentTerm) {
    const paymentTermDb = await this.paymentTermRepository.findOne({
      where: { id: paymentTerm.id },
    });

    if (paymentTermDb.status === Status.ACTIVE) {
      throw new HttpException('Bank cannot be deleted', 400);
    }

    const newPaymentTerm = new PaymentTerm({
      ...paymentTermDb,
      status: Status.DELETED,
      updatedAt: new Date(),
    });

    return await this.paymentTermRepository.update(
      newPaymentTerm,
      paymentTermDb,
    );
  }
}
