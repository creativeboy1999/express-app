import { RedisClientMultiCommandType } from "@redis/client/dist/lib/client/multi-command";
import { RedisClientType, RedisFunctions, RedisModules, RedisScripts } from "redis";
import { IRedisBaseRepository } from "../repositories-interface/base.repository";
export declare class RedisBaseRepository<T> implements IRedisBaseRepository<T> {
    protected readonly client: RedisClientType | RedisClientMultiCommandType<RedisModules, RedisFunctions, RedisScripts>;
    constructor(client: RedisClientType | RedisClientMultiCommandType<RedisModules, RedisFunctions, RedisScripts>);
    set(key: string, data: T): Promise<void>;
    get(key: string): Promise<T>;
    del(key: string): Promise<number | RedisClientMultiCommandType<RedisModules, RedisFunctions, RedisScripts>>;
}
