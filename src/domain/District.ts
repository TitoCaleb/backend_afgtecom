import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Department } from './Department';
import { Province } from './Province';
import { User } from './User';

@Entity('ubigeo_peru_district')
export class District {
  @PrimaryColumn()
  @OneToMany(() => User, (user) => user.district)
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => Province, (province) => province.id)
  province: Province;

  @ManyToOne(() => Department, (department) => department.id)
  department: Department;

  constructor(data?: Partial<District>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      name: this.name,
      province: this.province,
      department: this.department,
    };
  }
}
