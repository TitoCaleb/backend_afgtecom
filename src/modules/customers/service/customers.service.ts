import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CustomersRepositoryImpl } from '../repository/customers.repository';
import { Customer, QueryCustomer } from 'src/domain/Customer';
import { Status } from 'src/utils/enums';
import { PaymentTermRepositoryImpl } from 'src/modules/paymentTerm/repository/paymentTerm.repository';
import { BaseRepositoryImpl } from 'src/modules/base/repository/base.repository';
import { BusinessSectorRepositoryImpl } from 'src/modules/business-sector/repository/business-sector.repository';

@Injectable()
export class CustomersService {
  constructor(
    private customersRepository: CustomersRepositoryImpl,
    private paymentTermRepository: PaymentTermRepositoryImpl,
    private baseRepository: BaseRepositoryImpl,
    private businessSectorRepository: BusinessSectorRepositoryImpl,
  ) {}

  async findAll({ limit = 10, offset = 0, ...dynamicQuery }: QueryCustomer) {
    const pagination = {
      limit: Number(limit),
      offset: Number(offset),
    };
    const total = await this.customersRepository.count({
      where: { status: Status.ACTIVE, ...dynamicQuery },
    });
    const response = await this.customersRepository.findAll({
      where: { status: Status.ACTIVE, ...dynamicQuery },
      take: pagination.limit,
      skip: pagination.offset,
    });

    return {
      response,
      total,
      pagination,
    };
  }

  async findById(request: Customer) {
    return await this.customersRepository.findById(request);
  }

  async create(request: Customer) {
    await this.baseRepository.findCountryById(request.country);

    await this.paymentTermRepository.findOne({
      where: { id: request.paymentTerm.id },
    });

    if (request.businessSector.length) {
      const businessSector = await Promise.all(
        request.businessSector.map(async (businessSector) => {
          return await this.businessSectorRepository.findOne({
            where: { id: businessSector.id },
          });
        }),
      );
      request.businessSector = businessSector;
    }

    const customer = await this.customersRepository.create(request);

    return customer;
  }

  async update(request: Customer) {
    const customerDb = await this.customersRepository.findById(request);

    if (request.paymentTerm) {
      const paymentTerm = await this.paymentTermRepository.findOne({
        where: { id: request.paymentTerm.id },
      });

      if (!paymentTerm) {
        throw new NotFoundException('Payment term not found');
      }
    }

    if (request.country) {
      await this.baseRepository.findCountryById(request.country);
    }

    if (request.businessSector && request.businessSector.length > 0) {
      const businessSector = await Promise.all(
        request.businessSector.map(async (businessSector) => {
          return await this.businessSectorRepository.findOne({
            where: { id: businessSector.id },
          });
        }),
      );
      request.businessSector = businessSector;
    }

    customerDb.updatedAt = new Date();

    return await this.customersRepository.update(request, customerDb);
  }

  async delete(request: Customer) {
    const customerDb = await this.customersRepository.findById(request);

    if (customerDb.status === Status.ACTIVE) {
      throw new HttpException('Provider cannot be deleted', 400);
    }

    const customer = new Customer(customerDb);
    customer.status = Status.INACTIVE;
    customer.updatedAt = new Date();

    return await this.customersRepository.update(customer, customerDb);
  }
}
