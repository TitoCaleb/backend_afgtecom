import { HttpException, Injectable } from '@nestjs/common';
import { ProvidersRepositoryImpl } from '../repository/providers.repository';
import { Provider } from 'src/domain/Provider';
import { PaymentTermRepositoryImpl } from 'src/modules/paymentTerm/repository/paymentTerm.repository';
import { Status } from 'src/utils/enums';
import { BusinessSectorRepositoryImpl } from 'src/modules/business-sector/repository/business-sector.repository';

@Injectable()
export class ProvidersService {
  constructor(
    private providersRepository: ProvidersRepositoryImpl,
    private paymentTermRepository: PaymentTermRepositoryImpl,
    private businessSectorRepository: BusinessSectorRepositoryImpl,
  ) {}

  async findAll() {
    const response = await this.providersRepository.findAll({
      where: { status: Status.ACTIVE },
    });
    return response;
  }

  async findById(request: Provider) {
    return await this.providersRepository.findById(request);
  }

  async create(request: Provider) {
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

    const provider = await this.providersRepository.create(request);

    return provider;
  }

  async update(request: Provider) {
    const providerDb = await this.providersRepository.findById(request);

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