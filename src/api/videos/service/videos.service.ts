import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVideoDto } from '../model/create-video.dto';
import { UpdateVideoDto } from '../model/update-video.dto';
import { VideoRepository } from '../../../repositories/video.repository';
import { VideoDto } from '../model/video.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class VideosService {
  constructor(private readonly videoRepository: VideoRepository) {}

  create(createVideoDto: CreateVideoDto): Promise<VideoDto> {
    const video = this.videoRepository.create(createVideoDto);

    return this.videoRepository.save(video);
  }

  findAll(moduleId?: number): Promise<VideoDto[]> {
    if (moduleId) {
      return this.videoRepository.find({
        order: { id: 'ASC' },
        where: { module: { id: moduleId } },
      });
    }

    return this.videoRepository.find({
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<VideoDto> {
    const video = await this.videoRepository.findOne({
      where: { id: id },
    });

    if (!video) {
      throw new HttpException(
        'Não encontramos esse vídeo!',
        HttpStatus.NOT_FOUND,
      );
    }

    return video;
  }

  async update(id: number, updateVideoDto: UpdateVideoDto) {
    const video = await this.videoRepository.findOne(id);

    if (!video) {
      throw new HttpException(
        'Não encontramos esse vídeo!',
        HttpStatus.NOT_FOUND,
      );
    }

    const newVideo = { ...video, ...updateVideoDto };

    if (Object.keys(updateVideoDto).length !== 0) {
      await this.videoRepository.update(id, updateVideoDto);
    }

    return newVideo;
  }

  async remove(id: number): Promise<any> {
    const result: DeleteResult = await this.videoRepository.delete(id);

    if (result.affected == 0) {
      throw new HttpException('Recurso não encontrado.', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
