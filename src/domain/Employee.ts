import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Provider } from './Provider';

@Entity({ name: 'employee' })
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  middleName?: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 100 })
  motherLastName?: string;

  @Column({ type: 'varchar', length: 100 })
  phone?: string;

  @Column({ type: 'varchar', length: 100 })
  cellphone?: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  position: string;

  @Column({ type: 'varchar', length: 450 })
  comments?: string;

  @ManyToOne(() => Provider, (provider) => provider.employees)
  provider: Provider;

  constructor(data: Partial<Employee>) {
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
      cellphone: this.cellphone,
      email: this.email,
      position: this.position,
      comments: this.comments,
      provider: this.provider,
    };
  }
}
