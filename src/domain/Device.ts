import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Device' })
export class Device {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 100, name: 'device_name' })
  deviceName: string;

  @Column({ type: 'varchar', length: 100, name: 'device_uuid' })
  deviceUuid: string;

  constructor(data: Partial<Device>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
