import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'DocumentType' })
export class DocumentType {
  @PrimaryColumn()
  @OneToMany(() => User, (user) => user.documentTypeId)
  id: string;

  @Column({ type: 'varchar', length: 100, name: 'name', unique: true })
  name: string;

  @Column({ type: 'varchar', length: 100, name: 'acronym', unique: true })
  acronym: string;

  @Column({ type: 'int', name: 'size' })
  size: number;
}