import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BusinessSector } from './BusinessSector';
import { Status } from 'src/utils/enums';
import { PaymentTerm } from './PaymentTerm';
import { Employee } from './Employee';
import { Country } from './Country';
import { BaseDomain } from './BaseDomain';

export enum CustomerType {
  INDIVIDUAL = 'INDIVIDUAL',
  BUSINESS = 'BUSINESS',
}

export interface QueryCustomer extends Query {
  name?: string;
  documentNumber?: string;
}

@Entity({ name: 'customer' })
export class Customer extends BaseDomain {
  @Column({ type: 'enum', name: 'type', enum: CustomerType })
  type: CustomerType;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'varchar', unique: true })
  documentNumber: string;

  @OneToMany(() => Employee, (employee) => employee.provider)
  employees: Employee[];

  @Column({ type: 'varchar', length: 100 })
  phone: string;

  @Column({ type: 'varchar', length: 100 })
  address: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @ManyToOne(() => Country, (country) => country.id)
  country: Country;

  @ManyToMany(
    () => BusinessSector,
    (businessSector) => businessSector.customers,
  )
  @JoinTable({
    name: 'customer_businessSector',
    joinColumn: {
      name: 'customer_id',
    },
    inverseJoinColumn: {
      name: 'business_sector_id',
    },
  })
  businessSector: BusinessSector[];

  @ManyToOne(() => PaymentTerm, (paymentTerm) => paymentTerm.id)
  paymentTerm: PaymentTerm;

  @Column({
    type: 'enum',
    name: 'status',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  constructor(data: Partial<Customer>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      documentNumber: this.documentNumber,
      address: this.address,
      phone: this.phone,
      email: this.email,
      country: this.country,
      businessSector: this.businessSector,
      paymentTerm: this.paymentTerm,
      status: this.status,
    };
  }
}
