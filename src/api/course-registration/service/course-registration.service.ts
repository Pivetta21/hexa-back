import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterCourseDto } from '../model/register-course.dto';
import { CourseRegistrationRepository } from '../../../repositories/course-registration';
import { CourseRegistrationDto } from '../model/course-registration.dto';
import { RateCourseDto } from '../model/rate-course.dto';

@Injectable()
export class CourseRegistrationService {
  constructor(
    private readonly courseRegistrationRepository: CourseRegistrationRepository,
  ) {}

  async checkIfUserIsRegistered(
    userId: number,
    courseId: number,
  ): Promise<boolean> {
    const courseRegistration = await this.courseRegistrationRepository.findOne({
      where: {
        user: { id: userId },
        course: { id: courseId },
      },
    });

    return !!courseRegistration;
  }

  registerToCourse(
    registerChannelDto: RegisterCourseDto,
  ): Promise<CourseRegistrationDto> {
    const courseRegistration = this.courseRegistrationRepository.create({
      course: { id: registerChannelDto.courseId },
      user: { id: registerChannelDto.userId },
      price: registerChannelDto.price,
    });

    return this.courseRegistrationRepository.save(courseRegistration);
  }

  findUserCourses(userId: number): Promise<CourseRegistrationDto[]> {
    return this.courseRegistrationRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['course'],
    });
  }

  getCourseRate(courseId: number) {
    return this.courseRegistrationRepository
      .createQueryBuilder('cr')
      .select('AVG(cr.rate)', 'avg')
      .where('cr.courseId = :courseId', { courseId: courseId })
      .getRawOne();
  }

  async rateCourse(
    rateCourseDto: RateCourseDto,
  ): Promise<CourseRegistrationDto> {
    const courseRegistration = await this.courseRegistrationRepository.findOne({
      where: {
        user: { id: rateCourseDto.userId },
        course: { id: rateCourseDto.courseId },
      },
    });

    if (!courseRegistration) {
      throw new HttpException('Recurso não encontrado!', HttpStatus.NOT_FOUND);
    }

    courseRegistration.rate = rateCourseDto.rate;

    await this.courseRegistrationRepository.update(
      courseRegistration.id,
      courseRegistration,
    );

    return courseRegistration;
  }
}
