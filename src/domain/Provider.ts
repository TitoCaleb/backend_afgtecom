import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from './Employee';
import { BusinessSector } from './BusinessSector';
import { BankAccount } from './BankAccount';

@Entity({ name: 'provider' })
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  phone: string;

  @Column({ type: 'varchar', length: 12, unique: true })
  documentNumber: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  country: string;

  @Column({ type: 'varchar', length: 100 })
  address: string;

  @OneToMany(() => Employee, (employee) => employee.provider)
  @JoinTable()
  employees: Employee[];

  @OneToMany(() => BusinessSector, (businessSector) => businessSector.provider)
  @JoinTable()
  businessSector: BusinessSector[];

  @OneToMany(() => BankAccount, (bankAccount) => bankAccount.provider)
  @JoinTable()
  bankAccounts: BankAccount[];

  @Column({ type: 'varchar', length: 50 })
  creditLine: string;

  @Column({ type: 'varchar', length: 50 })
  paymentTerm: string;

  constructor(data: Partial<Provider>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      documentNumber: this.documentNumber,
      email: this.email,
      country: this.country,
      address: this.address,
      employees: this.employees,
      businessSector: this.businessSector,
      bankAccounts: this.bankAccounts,
      creditLine: this.creditLine,
      paymentTerm: this.paymentTerm,
    };
  }
}
