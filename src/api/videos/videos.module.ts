import { Module } from '@nestjs/common';
import { VideosService } from './service/videos.service';
import { VideosController } from './controller/videos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoRepository } from '../../repositories/video.repository';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([VideoRepository]), AuthModule],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
