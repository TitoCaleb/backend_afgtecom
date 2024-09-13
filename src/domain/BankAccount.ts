import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bank } from './Banks';
import { Provider } from './Provider';

export enum BankAccountType {
  SAVING = 'SAVING',
  CURRENT = 'CURRENT',
}

@Entity({ name: 'bank_account' })
export class BankAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  accountNumber: string;

  @Column({ type: 'varchar', length: 100 })
  CCI: string;

  @Column({ type: 'enum', enum: BankAccountType })
  type: string;

  @ManyToOne(() => Bank, (bank) => bank.bankAccounts)
  @JoinColumn()
  bank: Bank;

  @ManyToOne(() => Provider, (provider) => provider.bankAccounts)
  provider: Provider;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'update_at' })
  updatedAt: Date;

  constructor(data: Partial<BankAccount>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      accountNumber: this.accountNumber,
      CCI: this.CCI,
      type: this.type,
      bank: this.bank,
      provider: this.provider,
    };
  }
}
