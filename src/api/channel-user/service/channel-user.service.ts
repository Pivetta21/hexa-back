import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from '../../users/model/user.dto';
import { ChannelToUserRepository } from '../../../repositories/channel-to-user.repository';
import { ChannelUserDto } from '../model/channel-user.dto';
import { FollowChannelDto } from '../model/follow-channel.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class ChannelUserService {
  constructor(
    private readonly channelToUserRepository: ChannelToUserRepository,
  ) {}

  findChannelFollowers(channelId: number): Promise<ChannelUserDto[]> {
    return this.channelToUserRepository.find({
      where: { channel: { id: channelId } },
      relations: ['user'],
    });
  }

  findFollowingChannels(
    user: UserDto,
    userId: number,
  ): Promise<ChannelUserDto[]> {
    if (user.id != userId) {
      throw new HttpException('Sem permissão!', HttpStatus.UNAUTHORIZED);
    }

    return this.channelToUserRepository.find({
      where: { user: { id: userId } },
      relations: ['channel'],
    });
  }

  async followChannel(
    user: UserDto,
    followChannelDto: FollowChannelDto,
  ): Promise<ChannelUserDto> {
    if (user.id != followChannelDto.userId) {
      throw new HttpException('Sem permissão!', HttpStatus.UNAUTHORIZED);
    }

    const isFollowing = await this.checkIfUserIsFollowingChannel(
      followChannelDto,
    );

    if (isFollowing) {
      throw new HttpException('Você já segue este canal!', HttpStatus.CONFLICT);
    }

    const channelToUserInstance = this.channelToUserRepository.create({
      channel: { id: followChannelDto.channelId },
      user: { id: followChannelDto.userId },
    });

    return await this.channelToUserRepository.save(channelToUserInstance);
  }

  async checkIfUserIsFollowingChannel(
    followChannelDto: FollowChannelDto,
  ): Promise<boolean> {
    const isFollowing = await this.channelToUserRepository.findOne({
      where: {
        channel: { id: followChannelDto.channelId },
        user: { id: followChannelDto.userId },
      },
    });

    return !!isFollowing;
  }

  async unfollowChannel(followChannelDto: FollowChannelDto): Promise<any> {
    const channelToUser = await this.channelToUserRepository.findOne({
      where: {
        user: { id: followChannelDto.userId },
        channel: { id: followChannelDto.channelId },
      },
    });

    if (!channelToUser) {
      throw new HttpException(
        'Não encontramos o recurso que você deseja!',
        HttpStatus.NOT_FOUND,
      );
    }

    const result: DeleteResult = await this.channelToUserRepository.delete(
      channelToUser.id,
    );

    if (result.affected == 0) {
      throw new HttpException(
        'Problemas para deixar de seguir!',
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }
}
