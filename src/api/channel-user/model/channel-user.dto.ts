import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

import { ChannelDto } from '../../channels/model/channel.dto';
import { UserDto } from '../../users/model/user.dto';

export class ChannelUserDto {
  @IsInt()
  @ApiProperty({ example: 1 })
  id: number;

  @IsString()
  @ApiProperty({ example: '2021-07-05 00:26:06.399+00' })
  followed_at: string;

  @ApiProperty()
  channel?: ChannelDto;

  @ApiProperty()
  user?: UserDto;
}
