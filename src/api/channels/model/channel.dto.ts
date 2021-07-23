import { ApiProperty } from '@nestjs/swagger';

import {
  IsOptional,
  IsString,
  IsNotEmpty,
  Length,
  IsInt,
} from 'class-validator';

import { User } from './../../../entities/user.entity';

export class ChannelDto {
  @IsInt()
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty()
  user: User;

  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  @ApiProperty({ example: 'Ragnaros Channel' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Nice description here...', required: false })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'storage/images/filename.jpg' })
  banner_url?: string;

  @IsString()
  @ApiProperty({ example: '2021-07-05 00:26:06.399+00' })
  created_at: string;
}
