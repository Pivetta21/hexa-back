import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './course.entity';
import { ManyToOne } from 'typeorm';
import { Video } from './video.entity';

@Entity()
export class Module {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, (course) => course.modules, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  course!: Course;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @OneToMany(() => Video, (video) => video.module)
  videos!: Video[];
}
