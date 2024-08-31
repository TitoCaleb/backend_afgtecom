import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Brand } from './Brand';
import { Status } from 'src/utils/enums';

@Entity({ name: 'line' })
@Index(['brand', 'name'], { unique: true })
export class Line {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, name: 'name' })
  name: string;

  @ManyToOne(() => Brand, (brand) => brand.lines)
  brand: Brand;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'update_at' })
  updatedAt: Date;

  @Column({ type: 'enum', name: 'status', enum: Status })
  status: string;

  constructor(data?: Partial<Line>) {
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
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
