import { VideoDto } from '../../videos/model/video.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class VideoCommentsDto {
  @IsInt()
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: { id: 1 } })
  video: VideoDto;

  @IsInt()
  @ApiProperty({ example: 1 })
  user: number;

  @IsString()
  @ApiProperty({ example: 'Comment text here...' })
  text: string;

  @IsString()
  @ApiProperty({ example: '2021-07-05 00:26:06.399+00' })
  published_at: string;
}
