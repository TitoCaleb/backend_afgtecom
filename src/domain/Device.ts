import { Column, Entity } from 'typeorm';
import { BaseDomain } from './BaseDomain';

@Entity({ name: 'device' })
export class Device extends BaseDomain {
  @Column({ type: 'varchar', length: 100, name: 'device_name' })
  deviceName: string;

  @Column({ type: 'varchar', length: 100, name: 'device_uuid' })
  deviceUuid: string;

  constructor(data: Partial<Device>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
