import { Pool, PoolClient } from 'pg';
import { BaseRepository } from '../../db/repositories/base.repository';
import { CounterEntity } from './entity';
import { ICounterRepository } from './repository-interface';
export declare class CounterRepository extends BaseRepository<CounterEntity> implements ICounterRepository<CounterEntity> {
    constructor(db: Pool | PoolClient);
}
