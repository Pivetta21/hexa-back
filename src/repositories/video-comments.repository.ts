import { EntityRepository, Repository } from 'typeorm';

import { VideoComments } from '../entities/video-comments.entity';

@EntityRepository(VideoComments)
export class VideoCommentsRepository extends Repository<VideoComments> {}
