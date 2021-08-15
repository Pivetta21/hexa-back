import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { VideoCommentsRepository } from '../../../repositories/video-comments.repository';
import { CreateVideoCommentsDto } from '../model/create-video-comments.dto';
import { DeleteResult } from 'typeorm';

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

  async remove(id: number): Promise<any> {
    const result: DeleteResult = await this.videoCommentsRepository.delete(id);

    if (result.affected == 0) {
      throw new HttpException('Recurso não encontrado.', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
