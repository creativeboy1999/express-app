import { RedisClientType } from 'redis';
import { IRedisDataBase, IRedisDataBaseRepos, IRedisWithTransaction } from './redis.interface';
declare class RedisCLient implements IRedisDataBase {
    readonly client: RedisClientType;
    readonly repos: IRedisDataBaseRepos;
    constructor();
    withTransaction(): IRedisWithTransaction;
    initialize(): Promise<Error | null>;
    closeConnection(): Promise<Error | null>;
}
export declare const redisDatabaseInstance: RedisCLient;
export {};
