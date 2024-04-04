import { RedisClientMultiCommandType } from '@redis/client/dist/lib/client/multi-command';
import { createClient, RedisClientType, RedisFunctions, RedisModules, RedisScripts } from 'redis';
import { IRedisDataBase, IRedisDataBaseRepos, IRedisWithTransaction } from './redis.interface';
import { RedisUsersRepository } from './repositories/users.repository';
import { ENV } from '../../common/config';

const getRepositories = (
  client: RedisClientType | RedisClientMultiCommandType<RedisModules, RedisFunctions, RedisScripts>,
): IRedisDataBaseRepos => ({
  usersRepo: new RedisUsersRepository(client),
});

class RedisCLient implements IRedisDataBase {
  readonly client: RedisClientType;
  readonly repos: IRedisDataBaseRepos;

  constructor() {
    this.client = createClient({
      url: ENV.DB.REDIS.URL,
      password: ENV.DB.REDIS.PASSWORD,
      readonly: false,
    });

    this.client.on('error', (err) => console.log('Redis Client on Error', err));

    this.repos = getRepositories(this.client);
  }

  public withTransaction(): IRedisWithTransaction {
    const tr = this.client.multi();

    return {
      ...getRepositories(tr),
      commit: async function () {
        return await tr.exec();
      },
      rollback: async function () {
        return tr.discard();
      },
    };
  }

  public async initialize(): Promise<Error | null> {
    try {
      await this.client.connect();
      return null;
    } catch (error) {
      return error;
    }
  }

  public async closeConnection(): Promise<Error | null> {
    try {
      await this.client.quit();
      return null;
    } catch (error) {
      return error;
    }
  }
}

export const redisDatabaseInstance = new RedisCLient();
