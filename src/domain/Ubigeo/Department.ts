import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('ubigeo_peru_department')
export class Department {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  constructor(data?: Partial<Department>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
