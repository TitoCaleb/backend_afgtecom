import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('countries')
export class Country {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 10, unique: true })
  acronym: string;

  constructor(data?: Partial<Country>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      name: this.name,
      acronym: this.acronym,
    };
  }
}
