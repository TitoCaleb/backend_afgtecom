import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Department } from './Department';

@Entity('ubigeo_peru_province')
export class Province {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @ManyToOne(() => Department, (department) => department.id)
  department: Department;

  constructor(data?: Partial<Province>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      name: this.name,
      department: this.department,
    };
  }
}
