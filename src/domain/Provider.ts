import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Employee } from './Employee';
import { BankAccount } from './BankAccount';
import { BusinessSector } from './BusinessSector';
import { PaymentTerm } from './PaymentTerm';
import { Status } from 'src/utils/enums';
import { Country } from './Country';
import { BaseDomain } from './BaseDomain';

export interface QueryProvider extends Query {
  name?: string;
  documentNumber?: string;
}

@Entity({ name: 'provider' })
export class Provider extends BaseDomain {
  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  phone: string;

  @Column({ type: 'varchar', length: 12, unique: true })
  documentNumber: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @ManyToOne(() => Country, (country) => country.id)
  country: Country;

  @Column({ type: 'varchar', length: 100 })
  address: string;

  @OneToMany(() => Employee, (employee) => employee.provider)
  employees: Employee[];

  @OneToMany(() => BankAccount, (bankAccount) => bankAccount.provider)
  bankAccounts: BankAccount[];

  @Column({ type: 'varchar', length: 50 })
  creditLine: string;

  @ManyToOne(() => PaymentTerm, (paymentTerm) => paymentTerm.id)
  paymentTerm: PaymentTerm;

  @Column({
    type: 'enum',
    name: 'status',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @ManyToMany(
    () => BusinessSector,
    (businessSector) => businessSector.providers,
  )
  @JoinTable({
    name: 'provider_businessSector',
    joinColumn: {
      name: 'provider_id',
    },
    inverseJoinColumn: {
      name: 'business_sector_id',
    },
  })
  businessSector: BusinessSector[];

  constructor(data: Partial<Provider>) {
    super();
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
      bankAccounts: this.bankAccounts,
      creditLine: this.creditLine,
      paymentTerm: this.paymentTerm,
      businessSector: this.businessSector,
      status: this.status,
    };
  }
}
