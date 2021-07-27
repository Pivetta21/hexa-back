import { UserRepository } from '../../../repositories/user.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ChannelRepository } from '../../../repositories/channel.repository';

import { ChannelDto } from '../model/channel.dto';
import { CreateChannelDto } from '../model/create-channel.dto';
import { UpdateChannelDto } from '../model/update-channel.dto';
import { DeleteResult } from 'typeorm';
import { UserDto } from '../../users/model/user.dto';

@Injectable()
export class ChannelsService {
  constructor(
    private readonly channelRepository: ChannelRepository,
    private readonly userRepository: UserRepository,
  ) {}

  find(userId?: number): Promise<ChannelDto[] | ChannelDto> {
    if (userId) {
      return this.channelRepository.findOne({
        where: { user: userId },
        relations: ['user'],
      });
    }

    return this.channelRepository.find({
      order: { id: 'ASC' },
      relations: ['user'],
    });
  }

  async findOne(id: number): Promise<ChannelDto> {
    const channel = await this.channelRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    if (!channel) {
      throw new HttpException(
        'Não encontramos esse canal!',
        HttpStatus.NOT_FOUND,
      );
    }

    return channel;
  }

  async create(createChannelDto: CreateChannelDto): Promise<ChannelDto> {
    const user = await this.userRepository.findOne({
      where: { id: createChannelDto.user.id },
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

  async remove(id: number, user: UserDto): Promise<any> {
    const channel = await this.channelRepository.findOne({
      where: { id: id, user: user.id },
    });

    if (!channel) {
      throw new HttpException(
        'Não encontramos o recurso que você deseja!',
        HttpStatus.NOT_FOUND,
      );
    }

    const result: DeleteResult = await this.channelRepository.delete(id);

    if (result.affected == 0) {
      throw new HttpException('Recurso não encontrado.', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
