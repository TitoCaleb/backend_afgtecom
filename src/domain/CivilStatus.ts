import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { BaseDomain } from './BaseDomain';

export enum CivilStatusEnum {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED',
  WIDOW = 'WIDOW',
}

@Entity({ name: 'civil_status' })
export class CivilStatus extends BaseDomain {
  @PrimaryGeneratedColumn('uuid')
  @OneToMany(() => User, (user) => user.civilStatus)
  id: string;

  @Column({ type: 'varchar', length: 100, name: 'name', unique: true })
  name: CivilStatusEnum;

  constructor(data: Partial<CivilStatus>) {
    super();
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
