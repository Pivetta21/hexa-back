import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../../auth/auth.module';

import { ChannelRepository } from '../../repositories/channel.repository';
import { UserRepository } from '../../repositories/user.repository';

import { ChannelsController } from './controller/channels.controller';
import { ChannelsService } from './service/channels.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChannelRepository, UserRepository]),
    AuthModule,
  ],
  controllers: [ChannelsController],
  providers: [ChannelsService],
})
export class ChannelModule {}
