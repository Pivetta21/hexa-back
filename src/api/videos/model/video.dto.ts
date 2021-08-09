import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ModuleDto } from '../../modules/model/module.dto';

export class VideoDto {
  @IsInt()
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: { id: 1 } })
  module!: ModuleDto;

  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  @ApiProperty({ example: 'A video name' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Nice description here...', required: false })
  description: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '3/8/11/video1.mp4' })
  video_url: string;
}
