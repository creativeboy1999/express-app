import { getModelForClass } from '@typegoose/typegoose';
import { MongoBaseRepository } from '../../db/mongo/base.repository';
import { IRolesRepository } from './repository-interface';
import { RoleModel } from './model';

class RolesRepository
  extends MongoBaseRepository<RoleModel>
  implements IRolesRepository<RoleModel>
{
  constructor() {
    super(getModelForClass(RoleModel));
  }
}

export const rolesRepositoryInstance = new RolesRepository();
