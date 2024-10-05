import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseDomain } from './BaseDomain';

@Entity({ name: 'client' })
export class Client extends BaseDomain {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, name: 'client_id' })
  clientId: string;

  @Column({ type: 'varchar', length: 100, name: 'client_secret' })
  clientSecret: string;

  constructor(data: Partial<Client>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
