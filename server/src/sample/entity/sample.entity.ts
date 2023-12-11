import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('sample')
export class Sample {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'text' })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string;
}
