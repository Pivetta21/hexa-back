import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { StorageModule } from './storage/storage.module';
import { ChannelModule } from './channels/channels.module';

@Module({
  imports: [UsersModule, StorageModule, ChannelModule],
})
export class ApiModule {}
