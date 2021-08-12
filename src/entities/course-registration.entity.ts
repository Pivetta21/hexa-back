import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Course } from './course.entity';

@Entity()
export class CourseRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.courseRegistrations, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user!: User;

  @ManyToOne(() => Course, (course) => course.courseRegistrations, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  course!: Course;

  @Column('numeric', { precision: 5, scale: 2, nullable: false })
  price: number;

  @Column('numeric', { precision: 2, scale: 1, nullable: true })
  rate: number;

  @Column('integer', { default: () => 0, nullable: false })
  watched_videos: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @Column('timestamp', { nullable: true })
  finished_at: string;
}
