import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Channel } from './channel.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Channel, (channel) => channel.courses, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  channel!: Channel;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('varchar', { length: 255, nullable: true })
  image_url: string;

  @Column('numeric', { precision: 5, scale: 2, nullable: false })
  price: number;

  @Column('boolean', { nullable: false })
  isPublic: boolean;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;
}
