import { Module } from '@nestjs/common';

import { StorageModule } from './storage/storage.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, StorageModule],
})
export class ApiModule {}
