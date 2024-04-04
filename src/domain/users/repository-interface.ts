import { MongoBaseModel } from '../../db/mongo/base.model';
import { IMongoBaseRepository } from '../../db/mongo/base.repository.interface';
import { RoleDto } from '../roles/dto/role.dto';

export interface IUserRepository<T extends MongoBaseModel> extends IMongoBaseRepository<T> {
  setPassword(id: string, password: string): Promise<T>;
  getMe(id: string): Promise<T & { role: RoleDto }>;
}
