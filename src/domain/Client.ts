import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'client' })
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, name: 'client_id' })
  clientId: string;

  @Column({ type: 'varchar', length: 100, name: 'client_secret' })
  clientSecret: string;

  constructor(data: Partial<Client>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
