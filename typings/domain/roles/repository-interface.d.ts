import { MongoBaseModel } from '../../db/mongo/base.model';
import { IMongoBaseRepository } from '../../db/mongo/base.repository.interface';
export interface IRolesRepository<T extends MongoBaseModel> extends IMongoBaseRepository<T> {
}
