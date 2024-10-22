import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Bank } from './Banks';
import { Provider } from './Provider';
import { BaseDomain } from 'src/domain/BaseDomain';

export enum BankAccountType {
  SAVING = 'SAVING',
  CURRENT = 'CURRENT',
}

@Entity({ name: 'bank_account' })
export class BankAccount extends BaseDomain {
  @Column({ type: 'varchar', length: 100 })
  accountNumber: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  CCI: string;

  @Column({ type: 'enum', enum: BankAccountType })
  type: BankAccountType;

  @ManyToOne(() => Bank, (bank) => bank.bankAccounts)
  @JoinColumn()
  bank: Bank;

  @ManyToOne(() => Provider, (provider) => provider.bankAccounts)
  provider: Provider;

  constructor(data: Partial<BankAccount>) {
    super();
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
