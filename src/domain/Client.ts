import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Client' })
export class Client {
  @PrimaryColumn()
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
