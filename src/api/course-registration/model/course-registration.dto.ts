import { UserDto } from '../../users/model/user.dto';
import { CourseDto } from '../../courses/model/course.dto';
import { IsInt, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CourseRegistrationDto {
  @IsInt()
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty()
  user!: UserDto;

  @ApiProperty()
  course!: CourseDto;

  @IsNumber()
  @ApiProperty({ example: 4.5 })
  rate?: number;

  @IsNumber()
  @ApiProperty({ example: 12.5 })
  price: number;

  @IsInt()
  @ApiProperty({ example: 4 })
  watched_videos: number;

  @IsString()
  @ApiProperty({ example: '2021-07-05 00:26:06.399+00' })
  created_at: string;

  @IsString()
  @ApiProperty({ example: '2021-07-05 00:26:06.399+00' })
  finished_at?: string;
}
