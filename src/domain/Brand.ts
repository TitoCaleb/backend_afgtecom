import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum BrandStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity({ name: 'Brand' })
export class Brand {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 255, name: 'name', unique: true })
  name: string;

  @Column({ type: 'timestamp', name: 'created_at' })
  createAt: Date;

  @Column({ type: 'timestamp', name: 'update_at' })
  updateAt: Date;

  @Column({ type: 'boolean', name: 'status' })
  status: boolean;

  constructor(data?: Partial<Brand>) {
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
