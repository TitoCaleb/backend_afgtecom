import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Provider } from './Provider';
import { Status } from 'src/utils/enums';
import { Customer } from './Customer';
import { BaseDomain } from './BaseDomain';
import { Phone } from './Phone';

@Entity({ name: 'employee' })
export class Employee extends BaseDomain {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  middleName?: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  motherLastName?: string;

  @OneToMany(() => Phone, (phone) => phone.employee)
  phone: Phone[];

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  position: string;

  @Column({ type: 'varchar', length: 450 })
  comments?: string;

  @ManyToOne(() => Provider, (provider) => provider.employees)
  provider?: Provider;

  @ManyToOne(() => Customer, (provider) => provider.employees)
  customer?: Customer;

  @Column({
    type: 'enum',
    name: 'status',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  constructor(data: Partial<Employee>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      name: this.name,
      middleName: this.middleName,
      lastName: this.lastName,
      motherLastName: this.motherLastName,
      phone: this.phone,
      email: this.email,
      position: this.position,
      comments: this.comments,
      provider: this.provider,
      customer: this.customer,
      status: this.status,
    };
  }
}
