import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Channel } from './channel.entity';

@Entity()
export class ChannelToUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  followed_at: string;

  @ManyToOne(() => Channel, (channel) => channel.channelToUsers, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  channel!: Channel;

  @ManyToOne(() => User, (user) => user.channelToUsers, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user!: User;
}
