import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { VideoCommentsController } from './controller/ video-comments.controller';
import { VideoCommentsRepository } from '../../repositories/video-comments.repository';
import { VideoCommentsService } from './service/video-comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([VideoCommentsRepository]), AuthModule],
  controllers: [VideoCommentsController],
  providers: [VideoCommentsService],
})
export class VideoCommentsModule {}
