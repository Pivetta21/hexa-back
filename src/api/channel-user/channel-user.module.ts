import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChannelToUserRepository } from '../../repositories/channel-to-user.repository';

import { ChannelUserService } from './service/channel-user.service';
import { ChannelUserController } from './controller/channel-user.controller';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelToUserRepository]), AuthModule],
  controllers: [ChannelUserController],
  providers: [ChannelUserService],
})
export class ChannelUserModule {}
