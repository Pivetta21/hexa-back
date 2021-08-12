import { EntityRepository, Repository } from 'typeorm';

import { CourseRegistration } from '../entities/course-registration.entity';

@EntityRepository(CourseRegistration)
export class CourseRegistrationRepository extends Repository<CourseRegistration> {}
