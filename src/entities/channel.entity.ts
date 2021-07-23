import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Column('varchar', { length: 255, nullable: false, unique: true })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('varchar', { length: 255, nullable: true })
  banner_url: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;
}
