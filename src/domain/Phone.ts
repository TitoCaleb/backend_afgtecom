import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseDomain } from './BaseDomain';
import { Provider } from './Provider';
import { Customer } from './Customer';
import { Employee } from './Employee';

@Entity({ name: 'phone' })
export class Phone extends BaseDomain {
  @Column({ type: 'varchar', length: 100 })
  number: string;

  @ManyToOne(() => Provider, (provider) => provider.phone)
  provider?: Provider;

  @ManyToOne(() => Customer, (customer) => customer.phone)
  customer?: Customer;

  @ManyToOne(() => Employee, (employee) => employee.phone)
  employee?: Employee;

  constructor(data: Partial<Phone>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      number: this.number,
    };
  }
}
