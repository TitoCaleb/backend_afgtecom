import { Column, Entity, Index, ManyToMany } from 'typeorm';
import { Status } from 'src/utils/enums';
import { Provider } from './Provider';
import { Customer } from './Customer';
import { BaseDomain } from './BaseDomain';

@Entity({ name: 'business_sector' })
export class BusinessSector extends BaseDomain {
  @Column({ type: 'varchar', length: 100 })
  @Index({ unique: true })
  name: string;

  @ManyToMany(() => Provider, (provider) => provider.businessSector)
  providers: Provider[];

  @ManyToMany(() => Customer, (customer) => customer.businessSector)
  customers: Customer[];

  @Column({ type: 'enum', name: 'status', enum: Status })
  status: string;

  constructor(data: Partial<BusinessSector>) {
    super();
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
