import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { StorageModule } from './storage/storage.module';
import { ChannelModule } from './channels/channels.module';
import { ChannelUserModule } from './channel-user/channel-user.module';
import { CoursesModule } from './courses/courses.module';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [
    UsersModule,
    StorageModule,
    ChannelModule,
    ChannelUserModule,
    CoursesModule,
    ModulesModule,
  ],
})
export class ApiModule {}
