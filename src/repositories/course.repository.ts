import { Repository, EntityRepository } from 'typeorm';
import { Course } from '../entities/course.entity';

@EntityRepository(Course)
export class CourseRepository extends Repository<Course> {}
