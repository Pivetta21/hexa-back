import { OmitType } from '@nestjs/swagger';
import { VideoCommentsDto } from './video-comments.dto';

export class CreateVideoCommentsDto extends OmitType(VideoCommentsDto, [
  'id',
  'published_at',
]) {}
