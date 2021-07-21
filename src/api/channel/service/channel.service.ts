import { Injectable } from '@nestjs/common';

import { ChannelRepository } from './../../../repositories/channel.repository';

import { ChannelDto } from '../model/channel.dto';

@Injectable()
export class ChannelService {
  constructor(private readonly channelRepository: ChannelRepository) {}

  findAll(): Promise<ChannelDto[]> {
    return this.channelRepository.find({ order: { id: 'ASC' } });
  }
}
