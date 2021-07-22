import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from './../../../auth/guards/jwt-auth.guard';
import { ChannelsService } from './../service/channels.service';

import { ChannelDto } from '../model/channel.dto';
import { CreateChannelDto } from './../model/create-channel.dto';
import { UpdateChannelDto } from './../model/update-channel.dto';

@ApiTags('channels')
@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelService: ChannelsService) {}

  @Get()
  @ApiQuery({ name: 'userId', required: false })
  @ApiOkResponse({ type: ChannelDto, isArray: true })
  find(@Query('userId') userId?: number): Promise<ChannelDto[] | ChannelDto> {
    return this.channelService.find(userId);
  }

  @Get(':id')
  @ApiOkResponse({ type: ChannelDto })
  findOne(@Param('id') id: number): Promise<ChannelDto> {
    return this.channelService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ChannelDto })
  create(@Body() createChannelDto: CreateChannelDto): Promise<ChannelDto> {
    return this.channelService.create(createChannelDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ChannelDto })
  update(
    @Req() request: any,
    @Param('id') id: number,
    @Body() updateChannelDto: UpdateChannelDto,
  ): Promise<ChannelDto> {
    return this.channelService.update(id, updateChannelDto);
  }
}
