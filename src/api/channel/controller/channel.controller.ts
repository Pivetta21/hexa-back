import { ChannelService } from './../service/channel.service';
import { Controller, Get } from '@nestjs/common';

import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ChannelDto } from '../model/channel.dto';

@ApiTags('channel')
@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  @ApiOkResponse({ type: ChannelDto, isArray: true })
  findAll(): Promise<ChannelDto[]> {
    return this.channelService.findAll();
  }
}
