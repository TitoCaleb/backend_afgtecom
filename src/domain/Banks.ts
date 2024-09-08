import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BankAccount } from './BankAccount';
import { Status } from 'src/utils/enums';

@Entity({ name: 'bank' })
export class Bank {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @OneToMany(() => BankAccount, (bankAccount) => bankAccount.bank)
  bankAccounts: BankAccount[];

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'update_at' })
  updatedAt: Date;

  @Column({ type: 'enum', name: 'status', enum: Status })
  status: string;

  constructor(data: Partial<Bank>) {
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
