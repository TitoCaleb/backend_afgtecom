import { Column, Entity } from 'typeorm';
import { BaseDomain } from './BaseDomain';

@Entity({ name: 'factoring' })
export class Factoring extends BaseDomain {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  wholesaler: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  distributor: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  public: number;

  constructor(data: Partial<Factoring>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }

  getApiData() {
    return {
      id: this.id,
      wholesaler: this.wholesaler,
      distributor: this.distributor,
      public: this.public,
    };
  }
}
