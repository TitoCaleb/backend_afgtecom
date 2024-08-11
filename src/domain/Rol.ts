import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

export enum RolName {
  ADMIN = 'ADMIN',
  USER = 'USER',
  OWNER = 'OWNER',
}

@Entity({ name: 'rol' })
export class Rol {
  @PrimaryGeneratedColumn('uuid')
  @OneToMany(() => User, (user) => user.rol)
  id: string;

  @Column({ type: 'varchar', length: 100, name: 'name' })
  name: RolName;

  constructor(data: Partial<Rol>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
