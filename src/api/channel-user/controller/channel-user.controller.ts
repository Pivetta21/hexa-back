import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { ChannelUserService } from '../service/channel-user.service';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

import { UserDto } from '../../users/model/user.dto';
import { ChannelUserDto } from '../model/channel-user.dto';
import { FollowChannelDto } from '../model/follow-channel.dto';

@ApiTags('channel-user')
@Controller('channel-user')
export class ChannelUserController {
  constructor(private readonly channelUserService: ChannelUserService) {}

  @Get('followers/:channelId')
  @ApiOkResponse({ type: ChannelUserDto, isArray: true })
  findChannelFollowers(
    @Param('channelId') channelId: number,
  ): Promise<ChannelUserDto[]> {
    return this.channelUserService.findChannelFollowers(channelId);
  }

  @Get('channels/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ChannelUserDto, isArray: true })
  findFollowingChannels(
    @Req() request: any,
    @Param('userId') userId: number,
  ): Promise<ChannelUserDto[]> {
    const user: UserDto = request.user;

    return this.channelUserService.findFollowingChannels(user, userId);
  }

  @Get('follow-channel')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'userId', required: true })
  @ApiQuery({ name: 'channelId', required: true })
  @ApiOkResponse()
  checkIfUserIsFollowingChannel(
    @Query('channelId') channelId: number,
    @Query('userId') userId: number,
  ): Promise<boolean> {
    return this.channelUserService.checkIfUserIsFollowingChannel({
      channelId,
      userId,
    });
  }

  @Post('follow-channel')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ChannelUserDto })
  followChannel(
    @Req() request: any,
    @Body() followChannelDto: FollowChannelDto,
  ): Promise<ChannelUserDto> {
    const user: UserDto = request.user;

    return this.channelUserService.followChannel(user, followChannelDto);
  }

  @Delete('unfollow-channel/:id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiNoContentResponse()
  unfollowChannel(@Req() request: any, @Param('id') id: number): Promise<any> {
    const user: UserDto = request.user;

    return this.channelUserService.unfollowChannel({
      userId: user.id,
      channelId: id,
    });
  }
}
