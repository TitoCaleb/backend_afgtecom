import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'business_sector' })
export class BusinessSector {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  constructor(data: Partial<BusinessSector>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}