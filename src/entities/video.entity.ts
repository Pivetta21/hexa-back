import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Module } from './module.entity';
import { VideoComments } from './video-comments.entity';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Module, (module) => module.videos, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  module!: Module;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('varchar', { length: 255, nullable: false })
  video_url: string;

  @OneToMany(() => VideoComments, (videoComment) => videoComment.video)
  comments: VideoComments[];
}
