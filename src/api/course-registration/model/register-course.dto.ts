import { ApiProperty } from '@nestjs/swagger';

export class RegisterCourseDto {
  @ApiProperty({ example: 14 })
  userId: number;

  @ApiProperty({ example: 41 })
  courseId: number;

  @ApiProperty({ example: 12.5 })
  price: number;
}
