import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { Brand } from './Brand';
import { Status } from 'src/utils/enums';
import { BaseDomain } from './BaseDomain';

@Entity({ name: 'line' })
@Index(['brand', 'name'], { unique: true })
export class Line extends BaseDomain {
  @Column({ type: 'varchar', length: 255, name: 'name' })
  name: string;

  @ManyToOne(() => Brand, (brand) => brand.lines)
  brand: Brand;

  @Column({
    type: 'enum',
    name: 'status',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  constructor(data?: Partial<Line>) {
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
