import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './course.entity';
import { ManyToOne } from 'typeorm';

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
}
