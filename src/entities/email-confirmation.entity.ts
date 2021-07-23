import { User } from './user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class EmailConfirmation {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: number;

  @Column('integer')
  code: number;

  @Column('timestamp', {
    default: () => `CURRENT_TIMESTAMP + interval '24 hour'`,
  })
  expirationDate: string;
}
