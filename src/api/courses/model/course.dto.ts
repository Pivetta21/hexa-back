import { ApiProperty } from '@nestjs/swagger';

import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import { ChannelDto } from '../../channels/model/channel.dto';
import { ModuleDto } from '../../modules/model/module.dto';

export class CourseDto {
  @IsInt()
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: { id: 1 } })
  channel!: ChannelDto;

  @ApiProperty({ required: false })
  modules?: ModuleDto[];

  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  @ApiProperty({ example: 'Ragnaros Course' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Nice description here...', required: false })
  description: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'storage/images/filename.jpg' })
  image_url: string;

  @IsNumber()
  @ApiProperty({ example: 12.5 })
  price: number;

  @IsBoolean()
  @ApiProperty({ example: false })
  isPublic: boolean;

  @IsString()
  @ApiProperty({ example: '2021-07-05 00:26:06.399+00' })
  created_at: string;
}
