import { Permission } from 'src/entities/permission.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {}
