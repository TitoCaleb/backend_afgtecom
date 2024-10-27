import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { Brand } from './Brand';
import { Status } from 'src/utils/enums';
import { BaseDomain } from './BaseDomain';
import { Subgroup } from './Subgroup';

@Entity({ name: 'group' })
@Index(['brand', 'name'], { unique: true })
export class Group extends BaseDomain {
  @Column({ type: 'varchar', length: 255, name: 'name' })
  name: string;

  @ManyToOne(() => Brand, (brand) => brand.group)
  brand: Brand;

  @OneToMany(() => Subgroup, (subgroup) => subgroup.group)
  subgroups: Subgroup[];

  @Column({
    type: 'enum',
    name: 'status',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  constructor(data?: Partial<Group>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      name: this.name,
      brand: this.brand,
      status: this.status,
    };
  }
}
