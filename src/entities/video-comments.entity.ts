import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Video } from './video.entity';
import { User } from './user.entity';

@Entity()
export class VideoComments {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Video, (video) => video.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  video: Video;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: number;

  @Column('text', { nullable: false })
  text: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  published_at: string;
}
