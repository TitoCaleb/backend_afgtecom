import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Brand } from './Brand';

@Entity({ name: 'Line' })
@Index(['brand', 'name'], { unique: true })
export class Line {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, name: 'name' })
  name: string;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'update_at' })
  updatedAt: Date;

  @ManyToOne(() => Brand, (brand) => brand.lines)
  brand: Brand;

  constructor(data?: Partial<Line>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      name: this.name,
      brand: this.brand?.id,
    };
  }
}
