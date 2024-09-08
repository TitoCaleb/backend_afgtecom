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

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'update_at' })
  updatedAt: Date;

  constructor(data: Partial<DocumentType>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      name: this.name,
      acronym: this.acronym,
      size: this.size,
    };
  }
}
