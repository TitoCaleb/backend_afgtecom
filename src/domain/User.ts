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
import { District } from './District';
import { Department } from './Department';
import { Province } from './Province';
import { Status } from 'src/utils/enums';
import { BaseDomain } from './BaseDomain';

export interface UserModifyPassword {
  id?: string;
  oldPassword?: string;
  newPassword?: string;
}

export interface QueryUser extends Query {
  name?: string;
  documentNumber?: string;
  email?: string;
}

@Entity({ name: 'user' })
export class User extends BaseDomain {
  @PrimaryGeneratedColumn('uuid')
  @OneToOne(() => Token, (token) => token.userId)
  id: string;

  @Column({ type: 'varchar', length: 100, name: 'name' })
  name: string;

  @Column({ type: 'varchar', length: 100, name: 'middle_name', nullable: true })
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

  @ManyToOne(() => Department, (department) => department.id)
  department: Department;

  @ManyToOne(() => Province, (province) => province.id)
  province: Province;

  @ManyToOne(() => District, (district) => district.id)
  district: District;

  @Column({ type: 'varchar', length: 100, name: 'email', unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, name: 'password' })
  password: string;

  @Column({
    type: 'enum',
    name: 'status',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: string;

  @Column({ type: 'varchar', length: 100, name: 'token_id', nullable: true })
  @OneToOne(() => Token, (token) => token.id)
  tokenId: string;

  constructor(data: Partial<User>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      name: this.name,
      ...(this.middleName && { middleName: this.middleName }),
      lastName: this.lastName,
      motherLastName: this.motherLastName,
      phone: this.phone,
      address: this.address,
      district: this.district,
      province: this.province,
      department: this.department,
      birthdate: this.birthdate,
      documentType: this.documentType,
      documentNumber: this.documentNumber,
      civilStatus: this.civilStatus,
      rol: this.rol,
      email: this.email,
      status: this.status,
    };
  }

  getApiWithPassword() {
    return {
      ...this.getApiData(),
      password: this.password,
    };
  }
}
