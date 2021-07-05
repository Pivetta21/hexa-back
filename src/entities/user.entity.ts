import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from './permission.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Permission, (permission) => permission.id)
  permission: number;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('varchar', { length: 255, nullable: false, unique: true })
  email: string;

  @Column('varchar', { length: 255 })
  pictureUrl: string;

  @Column('varchar', { length: 400, nullable: false })
  password: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  signUpDate: string;

  @Column('boolean', { default: () => 'FALSE' })
  isCreator: boolean;
}
