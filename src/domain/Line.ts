import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Brand } from './Brand';

@Entity({ name: 'Line' })
export class Line {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, name: 'name', unique: true })
  name: string;

  @Column({ type: 'timestamp', name: 'created_at' })
  createAt: Date;

  @Column({ type: 'timestamp', name: 'update_at' })
  updateAt: Date;

  @ManyToOne(() => Brand, (brand) => brand.lines)
  brandId: string;

  constructor(data?: Partial<Line>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      name: this.name,
      createAt: this.createAt,
      updateAt: this.updateAt,
    };
  }
}
