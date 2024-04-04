export interface IRedisBaseRepository<T> {
  set(key: string, data: T): Promise<void>;
  get(key: string): Promise<T>;
  del(key: string);
}
