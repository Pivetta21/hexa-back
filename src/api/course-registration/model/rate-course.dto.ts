import { ApiProperty } from '@nestjs/swagger';

export class RateCourseDto {
  @ApiProperty({ example: 14 })
  userId: number;

  @ApiProperty({ example: 41 })
  courseId: number;

  @ApiProperty({ example: 4.5 })
  rate: number;
}
