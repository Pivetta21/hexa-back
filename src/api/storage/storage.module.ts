import { Module } from '@nestjs/common';

import { AuthModule } from '../../auth/auth.module';

import { StorageService } from './service/storage.service';
import { StorageController } from './controller/storage.controller';

import fs = require('fs');

@Module({
  imports: [AuthModule],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {
  constructor() {
    if (!fs.existsSync(process.env.STORAGE_IMAGES_DIR)) {
      fs.mkdirSync(process.env.STORAGE_IMAGES_DIR, { recursive: true });
    }

    if (!fs.existsSync(process.env.STORAGE_VIDEOS_DIR)) {
      fs.mkdirSync(process.env.STORAGE_VIDEOS_DIR, { recursive: true });
    }
  }
}
