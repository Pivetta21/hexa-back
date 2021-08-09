import { PartialType } from '@nestjs/mapped-types';
import { CreateVideoDto } from './create-video.dto';
import { OmitType } from '@nestjs/swagger';

export class UpdateVideoDto extends PartialType(
  OmitType(CreateVideoDto, ['module']),
) {}
