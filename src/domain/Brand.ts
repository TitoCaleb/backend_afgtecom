import { Column, Entity, OneToMany } from 'typeorm';
import { Group } from './Group';
import { Status } from 'src/utils/enums';
import { BaseDomain } from './BaseDomain';

@Entity({ name: 'brand' })
export class Brand extends BaseDomain {
  @Column({ type: 'varchar', length: 255, name: 'name', unique: true })
  name: string;

  @Column({
    type: 'enum',
    name: 'status',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @OneToMany(() => Group, (line) => line.brand)
  group: Group[];

  constructor(data?: Partial<Brand>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
    };
  }
}
