import { MongoBaseRepository } from '../../db/mongo/base.repository';
import { ILogsRepository } from './repository-interface';
import { LogModel } from './model';
declare class LogsRepository extends MongoBaseRepository<LogModel> implements ILogsRepository<LogModel> {
    constructor();
}
export declare const logsRepositoryInstance: LogsRepository;
export {};
