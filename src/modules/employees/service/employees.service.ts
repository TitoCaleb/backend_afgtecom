import { Injectable } from '@nestjs/common';
import { EmployeesRepositoryImpl } from '../repository/employees.repository';
import { ProvidersRepositoryImpl } from '../../providers/repository/providers.repository';
import { Provider } from 'src/domain/Provider';
import { Employee } from 'src/domain/Employee';
import { CustomersRepositoryImpl } from 'src/modules/customers/repository/customers.repository';
import { Customer } from 'src/domain/Customer';
import { PhoneRepositoryImpl } from 'src/modules/phone/repository/phone.repository';

@Injectable()
export class EmployeeService {
  constructor(
    private providersRepository: ProvidersRepositoryImpl,
    private employeesRepository: EmployeesRepositoryImpl,
    private customersRepository: CustomersRepositoryImpl,
    private phoneRepository: PhoneRepositoryImpl,
  ) {}

  // Proveedores

  private async checkIfProviderExists(request: Provider) {
    return await this.providersRepository.findById(request);
  }

  async findAllEmployeesFromProvider(request: Provider) {
    const providerDb = await this.checkIfProviderExists(request);
    const employees = await this.employeesRepository.findAll({
      where: { provider: new Provider({ id: providerDb.id }) },
    });
    return employees;
  }

  async addEmployeeToProvider(request: Employee) {
    await this.checkIfProviderExists(new Provider({ id: request.provider.id }));

    if (request.phone.length) {
      const phone = await Promise.all(
        request.phone.map(async (phone) => {
          return await this.phoneRepository.create(phone);
        }),
      );
      request.phone = phone;
    }

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

  // Customers

  private async checkIfCustomerExists(request: Customer) {
    return await this.customersRepository.findById(request);
  }

  async findAllEmployeesFromCustomers(request: Customer) {
    const customerDb = await this.checkIfCustomerExists(request);
    const employees = await this.employeesRepository.findAll({
      where: { customer: new Customer({ id: customerDb.id }) },
    });
    return employees;
  }

  async addEmployeeToCustomer(request: Employee) {
    await this.checkIfCustomerExists(new Customer({ id: request.customer.id }));
    const response = await this.employeesRepository.create(request);
    return response;
  }

  async updateEmployeeFromCustomer(request: Employee) {
    await this.checkIfCustomerExists(new Customer({ id: request.customer.id }));
    const employeeDb = await this.employeesRepository.findById(request);
    employeeDb.updatedAt = new Date();
    const response = await this.employeesRepository.update(request, employeeDb);
    return response;
  }

  async removeEmployeeFromCustomer(request: Employee) {
    await this.checkIfCustomerExists(new Customer({ id: request.customer.id }));
    const employeeDb = await this.employeesRepository.findById(request);
    const response = await this.employeesRepository.delete(employeeDb);
    return response;
  }
}
