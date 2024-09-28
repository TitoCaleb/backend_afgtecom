import { Injectable } from '@nestjs/common';
import { EmployeesRepositoryImpl } from '../repository/employees.repository';
import { ProvidersRepositoryImpl } from '../../providers/repository/providers.repository';
import { Provider } from 'src/domain/Provider';
import { Employee } from 'src/domain/Employee';

@Injectable()
export class EmployeeService {
  constructor(
    private providersRepository: ProvidersRepositoryImpl,
    private employeesRepository: EmployeesRepositoryImpl,
  ) {}

  private async checkIfProviderExists(request: Provider) {
    return await this.providersRepository.findById(request);
  }

  async findAllEmployeesFromProvider(request: Provider) {
    const providerDb = await this.checkIfProviderExists(request);
    const employees = await this.employeesRepository.findAll({
      where: { provider: providerDb },
    });
    return employees;
  }

  async addEmployeeToProvider(request: Employee) {
    await this.checkIfProviderExists(new Provider({ id: request.provider.id }));
    const response = await this.employeesRepository.create(request);
    return response;
  }

  async removeEmployeeFromProvider(request: Employee) {
    await this.checkIfProviderExists(new Provider({ id: request.provider.id }));
    const employeeDb = await this.employeesRepository.findById(request);
    const response = await this.employeesRepository.delete(employeeDb);
    return response;
  }

  async updateEmployeeFromProvider(request: Employee) {
    await this.checkIfProviderExists(new Provider({ id: request.provider.id }));
    const employeeDb = await this.employeesRepository.findById(request);
    employeeDb.updatedAt = new Date();
    const response = await this.employeesRepository.update(request, employeeDb);
    return response;
  }
}
