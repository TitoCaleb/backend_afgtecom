import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DocumentType } from './DocumentType';
import { CivilStatus } from './CivilStatus';
import { Rol } from './Rol';
import { Token } from './Token';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface UserModifyPassword {
  id?: string;
  oldPassword?: string;
  newPassword?: string;
}

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @OneToOne(() => Token, (token) => token.userId)
  id: string;

  @Column({ type: 'varchar', length: 100, name: 'name' })
  name: string;

  @Column({ type: 'varchar', length: 100, name: 'middle_name' })
  middleName?: string;

  @Column({ type: 'varchar', length: 100, name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', length: 100, name: 'mother_last_name' })
  motherLastName: string;

  @Column({ type: 'varchar', length: 100, name: 'phone', unique: true })
  phone: string;

  @Column({ type: 'varchar', length: 100, name: 'address' })
  address: string;

  @ManyToOne(() => DocumentType, (documentType) => documentType.id)
  documentType: DocumentType;

  @Column({ type: 'varchar', length: 100, name: 'document_number' })
  documentNumber: string;

  @Column({ type: 'date', name: 'birthdate' })
  birthdate: Date;

  @ManyToOne(() => CivilStatus, (civilStatus) => civilStatus.id)
  civilStatus: CivilStatus;

  @ManyToOne(() => Rol, (rol) => rol.id)
  rol: Rol;

  @Column({ type: 'varchar', length: 100, name: 'email', unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, name: 'password' })
  password: string;

  @Column({ type: 'boolean', name: 'status' })
  status: boolean;

  @Column({ type: 'varchar', length: 100, name: 'token_id', nullable: true })
  @OneToOne(() => Token, (token) => token.id)
  tokenId: string;

  constructor(data: Partial<User>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      name: this.name,
      middleName: this.middleName,
      lastName: this.lastName,
      motherLastName: this.motherLastName,
      phone: this.phone,
      address: this.address,
      documentType: this.documentType?.acronym,
      documentNumber: this.documentNumber,
      birthdate: this.birthdate,
      civilStatus: this.civilStatus?.name,
      rol: this.rol?.name,
      email: this.email,
      status: this.getStatus(),
    };
  }

  getStatus() {
    if (this.status) {
      return UserStatus.ACTIVE;
    }
    return UserStatus.INACTIVE;
  }
}
