import { Column, Entity, OneToMany } from 'typeorm';
import { BankAccount } from './BankAccount';
import { Status } from 'src/utils/enums';
import { BaseDomain } from './BaseDomain';

@Entity({ name: 'bank' })
export class Bank extends BaseDomain {
  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @OneToMany(() => BankAccount, (bankAccount) => bankAccount.bank)
  bankAccounts: BankAccount[];

  @Column({ type: 'enum', name: 'status', enum: Status })
  status: string;

  constructor(data: Partial<Bank>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
    };
  }
}
