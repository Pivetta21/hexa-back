import { EntityRepository, Repository } from 'typeorm';

import { ChannelToUser } from '../entities/channel-user.entity';

@EntityRepository(ChannelToUser)
export class ChannelToUserRepository extends Repository<ChannelToUser> {}
