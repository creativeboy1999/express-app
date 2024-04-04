import { RedisCommandRawReply } from '@redis/client/dist/lib/commands';
import { RedisUserEntity } from './entities/users.entity';
import { IRedisUsersRepository } from './repositories-interface/users.repository';
export interface IRedisDataBaseRepos {
    usersRepo: IRedisUsersRepository<RedisUserEntity>;
}
export interface IRedisWithTransaction extends IRedisDataBaseRepos {
    commit(): Promise<RedisCommandRawReply[]>;
    rollback(): Promise<unknown>;
}
export interface IRedisDataBase {
    readonly repos: IRedisDataBaseRepos;
    withTransaction(): IRedisWithTransaction;
    initialize(): Promise<Error | null>;
    closeConnection(): Promise<Error | null>;
}
