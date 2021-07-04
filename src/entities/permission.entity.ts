import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50, nullable: false, unique: true })
  name: string;
}
