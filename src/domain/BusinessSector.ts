import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  ManyToMany,
} from 'typeorm';
import { Status } from 'src/utils/enums';
import { Provider } from './Provider';

@Entity({ name: 'business_sector' })
export class BusinessSector {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Index({ unique: true })
  name: string;

  @ManyToMany(() => Provider, (provider) => provider.businessSector)
  providers: Provider[];

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'update_at' })
  updatedAt: Date;

  @Column({ type: 'enum', name: 'status', enum: Status })
  status: string;

  constructor(data: Partial<BusinessSector>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      name: this.name,
      providers: this.providers,
      status: this.status,
    };
  }
}
