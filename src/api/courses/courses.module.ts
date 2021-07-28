import { Module } from '@nestjs/common';
import { CoursesService } from './service/courses.service';
import { CoursesController } from './controller/courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseRepository } from '../../repositories/course.repository';
import { AuthModule } from '../../auth/auth.module';
import { ChannelRepository } from '../../repositories/channel.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseRepository, ChannelRepository]),
    AuthModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
