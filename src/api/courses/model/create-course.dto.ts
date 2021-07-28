import { OmitType } from '@nestjs/swagger';
import { CourseDto } from './course.dto';

export class CreateCourseDto extends OmitType(CourseDto, [
  'id',
  'created_at',
]) {}
