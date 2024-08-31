import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/domain/Employee';
import { FindManyOptions, Repository } from 'typeorm';

export class EmployeesRepositoryImpl {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async findAll(options?: FindManyOptions<Employee>): Promise<Employee[]> {
    return this.employeeRepository.find(options);
  }

  async findById(request: Employee): Promise<Employee> {
    const response = await this.employeeRepository.findOneBy({
      id: request.id,
    });

    if (!response) {
      throw new NotFoundException('Employee not found');
    }

    return response;
  }

  async create(request: Employee) {
    const response = await this.employeeRepository.save(request);
    return response;
  }

  async update(request: Employee, employeeDb: Employee) {
    this.employeeRepository.merge(employeeDb, request);
    const response = await this.employeeRepository.save(employeeDb);
    return response;
  }

  async delete(request: Employee) {
    await this.employeeRepository.delete(request.id);
    return request;
  }
}
