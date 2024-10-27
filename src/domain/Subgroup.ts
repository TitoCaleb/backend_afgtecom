import { Status } from 'src/utils/enums';
import { BaseDomain } from './BaseDomain';
import { Group } from './Group';
import { Column, Entity, Index, ManyToOne } from 'typeorm';

@Entity({ name: 'subgroup' })
@Index(['group', 'name'], { unique: true })
export class Subgroup extends BaseDomain {
  @Column({ type: 'varchar', length: 255, name: 'name' })
  name: string;

  @ManyToOne(() => Group, (brand) => brand.subgroups)
  group: Group;

  @Column({
    type: 'enum',
    name: 'status',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  constructor(data?: Partial<Subgroup>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      name: this.name,
      group: this.group,
      status: this.status,
    };
  }
}
