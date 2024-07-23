import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { DocumentType } from './DocumentType';
import { CivilStatus } from './CivilStatus';
import { Rol } from './Rol';
import { Token } from './Token';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity({ name: 'User' })
export class User {
  @PrimaryColumn()
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

  @Column({ type: 'varchar', length: 100, name: 'document_type_id' })
  @ManyToOne(() => DocumentType, (documentType) => documentType.id)
  documentTypeId: string;

  @Column({ type: 'varchar', length: 100, name: 'document_number' })
  documentNumber: string;

  @Column({ type: 'date', name: 'birthdate' })
  birthdate: Date;

  @Column({ type: 'varchar', length: 100, name: 'civil_status_id' })
  @ManyToOne(() => CivilStatus, (civilStatus) => civilStatus.id)
  civilStatusId: string;

  @Column({ type: 'varchar', length: 100, name: 'rol_id' })
  @ManyToOne(() => Rol, (rol) => rol.id)
  rolId: string;

  @Column({ type: 'varchar', length: 100, name: 'email', unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, name: 'password' })
  password: string;

  @Column({ type: 'boolean', name: 'status' })
  status: boolean;

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
      documentTypeId: this.documentTypeId,
      documentNumber: this.documentNumber,
      birthdate: this.birthdate,
      civilStatusId: this.civilStatusId,
      rolId: this.rolId,
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
