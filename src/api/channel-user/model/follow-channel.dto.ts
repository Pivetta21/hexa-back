import { ApiProperty } from '@nestjs/swagger';

export class FollowChannelDto {
  @ApiProperty({ example: 14 })
  userId: number;

  @ApiProperty({ example: 41 })
  channelId: number;
}
