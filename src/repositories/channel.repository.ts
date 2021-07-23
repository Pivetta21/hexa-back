import { Repository, EntityRepository } from 'typeorm';

import { Channel } from './../entities/channel.entity';

@EntityRepository(Channel)
export class ChannelRepository extends Repository<Channel> {}
