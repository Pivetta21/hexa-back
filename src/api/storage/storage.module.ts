import { Module } from '@nestjs/common';

import { AuthModule } from '../../auth/auth.module';

import { StorageService } from './service/storage.service';
import { StorageController } from './controller/storage.controller';

@Module({
  imports: [AuthModule],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
