import { BaseRepositoryImpl } from 'src/modules/base/repository/base.repository';
import { BusinessSectorRepositoryImpl } from 'src/modules/business-sector/repository/business-sector.repository';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PaymentTermRepositoryImpl } from 'src/modules/paymentTerm/repository/paymentTerm.repository';
import { Provider, QueryProvider } from 'src/domain/Provider';
import { ProvidersRepositoryImpl } from '../repository/providers.repository';
import { Status } from 'src/utils/enums';
import { PhoneRepositoryImpl } from 'src/modules/phone/repository/phone.repository';

@Injectable()
export class ProvidersService {
  constructor(
    private providersRepository: ProvidersRepositoryImpl,
    private paymentTermRepository: PaymentTermRepositoryImpl,
    private businessSectorRepository: BusinessSectorRepositoryImpl,
    private baseRepository: BaseRepositoryImpl,
    private phoneRepository: PhoneRepositoryImpl,
  ) {}

  async findAll({ limit = 10, offset = 0, ...dynamicQuery }: QueryProvider) {
    const pagination = {
      limit: Number(limit),
      offset: Number(offset),
    };
    const total = await this.providersRepository.count({
      where: { status: Status.ACTIVE, ...dynamicQuery },
    });
    const response = await this.providersRepository.findAll({
      where: { status: Status.ACTIVE, ...dynamicQuery },
      relations: ['businessSector'],
      take: pagination.limit,
      skip: pagination.offset,
    });

    return {
      response,
      total,
      pagination,
    };
  }

  async findById(request: Provider) {
    return await this.providersRepository.findById(request);
  }

  async create(request: Provider) {
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

    if (request.phone.length) {
      const phone = await Promise.all(
        request.phone.map(async (phone) => {
          return await this.phoneRepository.create(phone);
        }),
      );
      request.phone = phone;
    }

    const provider = await this.providersRepository.create(request);

    return provider;
  }

  async update(request: Provider) {
    const providerDb = await this.providersRepository.findById(request);

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

    providerDb.updatedAt = new Date();

    return await this.providersRepository.update(request, providerDb);
  }

  async delete(request: Provider) {
    const providerDb = await this.providersRepository.findById(request);

    if (providerDb.status === Status.ACTIVE) {
      throw new HttpException('Provider cannot be deleted', 400);
    }

    const provider = new Provider(providerDb);
    provider.updatedAt = new Date();
    provider.status = Status.DELETED;

    return await this.providersRepository.update(provider, providerDb);
  }
}
