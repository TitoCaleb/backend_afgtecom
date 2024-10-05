import { Status } from 'src/utils/enums';
import { Column, Entity } from 'typeorm';
import { BaseDomain } from './BaseDomain';

@Entity({ name: 'category' })
export class Category extends BaseDomain {
  @Column({ type: 'varchar', length: 255, name: 'name', unique: true })
  name: string;

  @Column({ type: 'enum', name: 'status', enum: Status })
  status: string;

  constructor(data?: Partial<Category>) {
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
