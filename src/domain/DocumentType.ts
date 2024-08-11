import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'document_type' })
export class DocumentType {
  @PrimaryGeneratedColumn('uuid')
  @OneToMany(() => User, (user) => user.documentType)
  id: string;

  @Column({ type: 'varchar', length: 100, name: 'name', unique: true })
  name: string;

  @Column({ type: 'varchar', length: 100, name: 'acronym', unique: true })
  acronym: string;

  @Column({ type: 'int', name: 'size' })
  size: number;

  constructor(data: Partial<DocumentType>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
