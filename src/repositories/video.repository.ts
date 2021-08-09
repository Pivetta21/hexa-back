import { EntityRepository, Repository } from 'typeorm';
import { Video } from '../entities/video.entity';

@EntityRepository(Video)
export class VideoRepository extends Repository<Video> {}
