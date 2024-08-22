import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { Provider } from './Provider';

@Entity({ name: 'business_sector' })
@Index(['name', 'provider'])
export class BusinessSector {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => Provider, (provider) => provider.businessSector)
  provider: Provider;

  constructor(data: Partial<BusinessSector>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
