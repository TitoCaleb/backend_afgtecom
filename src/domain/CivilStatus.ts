import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

export enum CivilStatusEnum {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED',
  WIDOW = 'WIDOW',
}

@Entity({ name: 'CivilStatus' })
export class CivilStatus {
  @PrimaryGeneratedColumn('uuid')
  @OneToMany(() => User, (user) => user.civilStatusId)
  id: string;

  @Column({ type: 'varchar', length: 100, name: 'name', unique: true })
  name: CivilStatusEnum;

  constructor(data: Partial<CivilStatus>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
