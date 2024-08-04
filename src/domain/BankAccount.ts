import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bank } from './Banks';
import { Provider } from './Provider';

@Entity({ name: 'bank_account' })
export class BankAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  dolarAccountNumber: string;

  @Column({ type: 'varchar', length: 100 })
  solesAccountNumber: string;

  @ManyToOne(() => Bank, (bank) => bank.bankAccounts)
  @JoinColumn()
  bank: Bank;

  @ManyToOne(() => Provider, (provider) => provider.bankAccounts)
  provider: Provider;

  constructor(data: Partial<BankAccount>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      dolarAccountNumber: this.dolarAccountNumber,
      solesAccountNumber: this.solesAccountNumber,
      bank: this.bank,
      provider: this.provider,
    };
  }
}
