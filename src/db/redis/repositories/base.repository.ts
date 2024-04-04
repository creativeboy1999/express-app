import { RedisClientMultiCommandType } from "@redis/client/dist/lib/client/multi-command";
import {
  RedisClientType,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from "redis";
import { IRedisBaseRepository } from "../repositories-interface/base.repository";

export class RedisBaseRepository<T> implements IRedisBaseRepository<T> {
  constructor(
    protected readonly client:
      | RedisClientType
      | RedisClientMultiCommandType<RedisModules, RedisFunctions, RedisScripts>,
  ) { }

  async set(key: string, data: T): Promise<void> {
    await this.client.set(key, JSON.stringify(data));
  }

  async get(key: string): Promise<T> {
    const res = await this.client.get(key);

    return res ? JSON.parse(res.toString()) : null;
  }

  async del(key: string) {
    let res = await this.client.del(key);
    console.log("remove data in redis: ", res);
    return res;
  }
}
