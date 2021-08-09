import { OmitType } from '@nestjs/swagger';
import { VideoDto } from './video.dto';

export class CreateVideoDto extends OmitType(VideoDto, ['id']) {}
