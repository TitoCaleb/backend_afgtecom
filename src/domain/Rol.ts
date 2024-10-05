import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { BaseDomain } from './BaseDomain';

export enum RolName {
  ADMIN = 'ADMIN',
  USER = 'USER',
  OWNER = 'OWNER',
}

@Entity({ name: 'rol' })
export class Rol extends BaseDomain {
  @PrimaryGeneratedColumn('uuid')
  @OneToMany(() => User, (user) => user.rol)
  id: string;

  @Column({ type: 'varchar', length: 100, name: 'name' })
  name: RolName;

  constructor(data: Partial<Rol>) {
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
