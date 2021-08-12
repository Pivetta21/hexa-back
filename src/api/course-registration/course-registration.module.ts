import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { CourseRegistrationController } from './controller/course-registration.controller';
import { CourseRegistrationService } from './service/course-registration.service';
import { CourseRegistrationRepository } from '../../repositories/course-registration';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseRegistrationRepository]),
    AuthModule,
  ],
  controllers: [CourseRegistrationController],
  providers: [CourseRegistrationService],
})
export class CourseRegistrationModule {}
