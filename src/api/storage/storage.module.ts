import { Module } from '@nestjs/common';

import { AuthModule } from '../../auth/auth.module';

import { StorageService } from './service/storage.service';
import { StorageController } from './controller/storage.controller';

import fs = require('fs');

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';
import { ChannelRepository } from 'src/repositories/channel.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, ChannelRepository]),
    AuthModule,
  ],
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
