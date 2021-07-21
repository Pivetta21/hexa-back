import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  banner_url: string;

  @ApiProperty()
  created_at: string;
}
