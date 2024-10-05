import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseDomain {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'update_at' })
  updatedAt: Date;
}
