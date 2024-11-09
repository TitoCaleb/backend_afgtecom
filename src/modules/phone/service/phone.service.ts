import { Injectable } from '@nestjs/common';
import { PhoneRepositoryImpl } from '../repository/phone.repository';
import { Phone } from 'src/domain/Phone';

@Injectable()
export class PhoneService {
  constructor(private phoneRepository: PhoneRepositoryImpl) {}

  async findAll() {
    return await this.phoneRepository.findAll();
  }

  async findOne(phone: Phone) {
    return await this.phoneRepository.findOne({
      where: { id: phone.id },
    });
  }

  async create(phone: Phone) {
    return await this.phoneRepository.create(phone);
  }

  async update(phone: Phone) {
    const phoneBd = await this.phoneRepository.findOne({
      where: { id: phone.id },
    });

    return await this.phoneRepository.update(phone, phoneBd);
  }

  async delete(phone: Phone) {
    return await this.phoneRepository.delete(phone);
  }
}
