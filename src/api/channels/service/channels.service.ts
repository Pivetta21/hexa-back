import { UserRepository } from '../../../repositories/user.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ChannelRepository } from '../../../repositories/channel.repository';

import { ChannelDto } from '../model/channel.dto';
import { CreateChannelDto } from '../model/create-channel.dto';
import { UpdateChannelDto } from '../model/update-channel.dto';

@Injectable()
export class ChannelsService {
  constructor(
    private readonly channelRepository: ChannelRepository,
    private readonly userRepository: UserRepository,
  ) {}

  find(userId?: number): Promise<ChannelDto[] | ChannelDto> {
    if (userId) {
      return this.channelRepository.findOne({ where: { user: userId } });
    }

    return this.channelRepository.find({ order: { id: 'ASC' } });
  }

  findOne(id: number): Promise<ChannelDto> {
    return this.channelRepository.findOne({ where: { id: id } });
  }

  async create(createChannelDto: CreateChannelDto): Promise<ChannelDto> {
    const user = await this.userRepository.findOne({
      where: { id: createChannelDto.user },
    });

    if (!user) {
      throw new HttpException('Problemas com sua conta!', HttpStatus.NOT_FOUND);
    }

    return await this.channelRepository.save(createChannelDto);
  }

  async update(
    id: number,
    updateChannelDto: UpdateChannelDto,
  ): Promise<ChannelDto> {
    const channel = await this.channelRepository.findOne(id);
    const newChannel = { ...channel, ...updateChannelDto };

    await this.channelRepository.update(id, updateChannelDto);

    return newChannel;
  }
}
