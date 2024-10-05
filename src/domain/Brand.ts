import { Column, Entity, OneToMany } from 'typeorm';
import { Line } from './Line';
import { Status } from 'src/utils/enums';
import { BaseDomain } from './BaseDomain';

@Entity({ name: 'brand' })
export class Brand extends BaseDomain {
  @Column({ type: 'varchar', length: 255, name: 'name', unique: true })
  name: string;

  @Column({ type: 'enum', name: 'status', enum: Status })
  status: string;

  @OneToMany(() => Line, (line) => line.brand)
  lines: Line[];

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
