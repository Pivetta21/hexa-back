import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { ChannelRepository } from 'src/repositories/channel.repository';

import { ChannelController } from './controller/channel.controller';
import { ChannelService } from './service/channel.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelRepository]), AuthModule],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {}
