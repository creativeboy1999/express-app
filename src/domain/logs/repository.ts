import { getModelForClass } from '@typegoose/typegoose';
import { MongoBaseRepository } from '../../db/mongo/base.repository';
import { ILogsRepository } from './repository-interface';
import { LogModel } from './model';

class LogsRepository
  extends MongoBaseRepository<LogModel>
  implements ILogsRepository<LogModel>
{
  constructor() {
    super(getModelForClass(LogModel));
  }
}

export const logsRepositoryInstance = new LogsRepository();
