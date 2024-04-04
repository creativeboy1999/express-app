import { RedisUserEntity } from '../entities/users.entity';
import { IRedisUsersRepository } from '../repositories-interface/users.repository';
import { RedisBaseRepository } from './base.repository';

export class RedisUsersRepository
  extends RedisBaseRepository<RedisUserEntity>
  implements IRedisUsersRepository<RedisUserEntity> {}
