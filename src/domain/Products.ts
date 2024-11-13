import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseDomain } from './BaseDomain';
import { Brand } from './Brand';
import { Group } from './Group';
import { Subgroup } from './Subgroup';
import { Factoring } from './factoring';
import { Pricing } from './Pricing';
import { Status } from 'src/utils/enums';

export interface QueryProduct extends Query {
  code?: string;
  serie?: string;
  group?: string;
  subGroup?: string;
  brand?: string;
}

@Entity({ name: 'products' })
export class Products extends BaseDomain {
  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({ type: 'varchar', length: 100 })
  serie: string;

  @ManyToOne(() => Group, (group) => group.id)
  group: Group;

  @ManyToOne(() => Subgroup, (subgroup) => subgroup.id)
  subGroup: Subgroup;

  @ManyToOne(() => Brand, (brand) => brand.id)
  brand: Brand;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost: number;

  @JoinColumn()
  @OneToOne(() => Factoring, (factoring) => factoring.id)
  factoring: Factoring;

  @JoinColumn()
  @OneToOne(() => Pricing, (pricing) => pricing.id)
  pricing: Pricing;

  observation: string;

  @Column({
    type: 'enum',
    name: 'status',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  constructor(data: Partial<Products>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }

  validateBrandsAndGroup() {
    return !!this.brand || !!this.group || !!this.subGroup;
  }

  getApiData() {
    return {
      id: this.id,
      code: this.code,
      description: this.description,
      serie: this.serie,
      group: this.group,
      subGroup: this.subGroup,
      brand: this.brand,
      cost: this.cost,
      factoring: this.factoring,
      pricing: this.pricing,
      observation: this.observation,
      status: this.status,
    };
  }
}
