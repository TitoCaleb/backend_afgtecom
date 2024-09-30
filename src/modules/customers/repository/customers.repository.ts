import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/domain/Customer';
import { FindManyOptions, Repository } from 'typeorm';

export class CustomersRepositoryImpl {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async count(options?: FindManyOptions<Customer>): Promise<number> {
    const response = await this.customerRepository.count(options);
    return response;
  }

  async findAll(options?: FindManyOptions<Customer>): Promise<Customer[]> {
    const response = await this.customerRepository.find(options);
    return response;
  }

  async findById(request: Customer): Promise<Customer> {
    const response = await this.customerRepository.findOne({
      where: { id: request.id },
      relations: ['employees', 'businessSector', 'paymentTerm', 'country'],
    });

    if (!response) {
      throw new NotFoundException('Customer not found');
    }

    return response;
  }

  async create(request: Customer) {
    const response = await this.customerRepository.save(request);
    return response;
  }

  async update(request: Customer, customerDb: Customer) {
    Object.assign(customerDb, request);
    const response = await this.customerRepository.save(customerDb);
    return response;
  }

  async delete(request: Customer) {
    await this.customerRepository.delete(request.id);
    return request;
  }
}
