import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { BaseDomain } from './BaseDomain';

@Entity({ name: 'document_type' })
export class DocumentType extends BaseDomain {
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
    super();
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
