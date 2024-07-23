import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'Token' })
export class Token {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 100, name: 'token' })
  token: string;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'expired_at' })
  expiredAt: Date;

  @Column({ type: 'varchar', length: 100, name: 'device_id' })
  deviceId: string;

  @Column({ type: 'varchar', length: 100, name: 'device_uuid' })
  deviceUuid: string;

  @Column({ type: 'varchar', length: 100, name: 'device_name' })
  deviceName: string;

  @Column({ type: 'varchar', length: 100, name: 'user_id', nullable: true })
  @OneToOne(() => User, (user) => user.id)
  userId: string;

  @Column({ type: 'boolean', name: 'status' })
  status: boolean;

  constructor(data: Partial<Token>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      token: this.token,
      expiredAt: this.expiredAt,
      createdAt: this.createdAt,
    };
  }
}
