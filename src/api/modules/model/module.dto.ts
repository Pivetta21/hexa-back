import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

import { CourseDto } from '../../courses/model/course.dto';
import { VideoDto } from '../../videos/model/video.dto';

export class ModuleDto {
  @IsInt()
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: { id: 1 } })
  course!: CourseDto;

  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  @ApiProperty({ example: 'The First Module' })
  name: string;

  @ApiProperty({ required: false })
  videos?: VideoDto[];
}
