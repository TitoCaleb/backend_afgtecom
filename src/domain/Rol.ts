import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { User } from './User';

export enum RolName {
  ADMIN = 'ADMIN',
  USER = 'USER',
  OWNER = 'OWNER',
}

@Entity({ name: 'Rol' })
export class Rol {
  @PrimaryColumn()
  @OneToMany(() => User, (user) => user.rolId)
  id: string;

  @Column({ type: 'varchar', length: 100, name: 'name' })
  name: RolName;
}
