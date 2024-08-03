import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'device' })
export class Device {
  @PrimaryGeneratedColumn('uuid')
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
