import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './user.entity';
import { ChannelToUser } from './channel-user.entity';
import { Course } from './course.entity';

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

  @OneToMany(() => ChannelToUser, (channelToUser) => channelToUser.channel)
  channelToUsers!: ChannelToUser[];

  @OneToMany(() => Course, (course) => course.channel)
  courses!: Course[];
}
