import { MongoBaseModel } from '../../db/mongo/base.model';
import { IMongoBaseRepository } from '../../db/mongo/base.repository.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ILogsRepository<T extends MongoBaseModel> extends IMongoBaseRepository<T> {}
