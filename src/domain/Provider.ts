import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from './Employee';
import { BankAccount } from './BankAccount';
import { ProviderSector } from './ProviderSector';
import { BusinessSector } from './BusinessSector';

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
  employees: Employee[];

  @OneToMany(() => ProviderSector, (providerSector) => providerSector.provider)
  providerSectors: ProviderSector[];

  @OneToMany(() => BankAccount, (bankAccount) => bankAccount.provider)
  bankAccounts: BankAccount[];

  @Column({ type: 'varchar', length: 50 })
  creditLine: string;

  @Column({ type: 'varchar', length: 50 })
  paymentTerm: string;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'update_at' })
  updatedAt: Date;

  businessSector: BusinessSector[];

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
      providerSectors: this.providerSectors,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
