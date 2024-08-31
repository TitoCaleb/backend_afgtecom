import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Provider } from './Provider';
import { Status } from 'src/global';

@Entity({ name: 'payment_term' })
export class PaymentTerm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, name: 'condition', unique: true })
  condition: string;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'update_at' })
  updatedAt: Date;

  @OneToMany(() => Provider, (provider) => provider.paymentTerm)
  providers: Provider[];

  @Column({ type: 'varchar', length: 50, name: 'status', enum: Status })
  status: string;

  constructor(data?: Partial<PaymentTerm>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      name: this.condition,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      status: this.status,
    };
  }
}
