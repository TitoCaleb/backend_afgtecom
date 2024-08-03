import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Line } from './Line';

export enum BrandStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity({ name: 'brand' })
export class Brand {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, name: 'name', unique: true })
  name: string;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'update_at' })
  updatedAt: Date;

  @Column({ type: 'boolean', name: 'status' })
  status: boolean;

  @OneToMany(() => Line, (line) => line.brand)
  lines: Line[];

  constructor(data?: Partial<Brand>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      name: this.name,
      status: this.getStatus(),
    };
  }

  getStatus() {
    if (this.status) {
      return BrandStatus.ACTIVE;
    }
    return BrandStatus.INACTIVE;
  }
}
