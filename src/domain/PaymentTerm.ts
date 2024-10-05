import { Column, Entity, OneToMany } from 'typeorm';
import { Provider } from './Provider';
import { Status } from 'src/utils/enums';
import { BaseDomain } from './BaseDomain';

@Entity({ name: 'payment_term' })
export class PaymentTerm extends BaseDomain {
  @Column({ type: 'varchar', length: 255, name: 'condition', unique: true })
  condition: string;

  @OneToMany(() => Provider, (provider) => provider.paymentTerm)
  providers: Provider[];

  @Column({ type: 'enum', name: 'status', enum: Status })
  status: string;

  constructor(data?: Partial<PaymentTerm>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      condition: this.condition,
      status: this.status,
    };
  }
}
