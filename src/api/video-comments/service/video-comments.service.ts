import { Injectable } from '@nestjs/common';
import { VideoCommentsRepository } from '../../../repositories/video-comments.repository';
import { CreateVideoCommentsDto } from '../model/create-video-comments.dto';

@Injectable()
export class VideoCommentsService {
  constructor(
    private readonly videoCommentsRepository: VideoCommentsRepository,
  ) {}

  find(videoId: number) {
    return this.videoCommentsRepository.find({
      where: {
        video: { id: videoId },
      },
      relations: ['user'],
    });
  }

  create(createVideoCommentsDto: CreateVideoCommentsDto) {
    const videoComment = this.videoCommentsRepository.create(
      createVideoCommentsDto,
    );

    return this.videoCommentsRepository.save(videoComment);
  }
}
