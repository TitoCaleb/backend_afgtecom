import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { ProviderSector } from './ProviderSector';

@Entity({ name: 'business_sector' })
export class BusinessSector {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Index({ unique: true })
  name: string;

  @OneToMany(
    () => ProviderSector,
    (providerSector) => providerSector.businessSector,
  )
  providerSectors: ProviderSector[];

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'update_at' })
  updatedAt: Date;

  constructor(data: Partial<BusinessSector>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      name: this.name,
      providerSectors: this.providerSectors,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
