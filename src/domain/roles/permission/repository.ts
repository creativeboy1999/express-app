import { getModelForClass } from '@typegoose/typegoose';
import { MongoBaseRepository } from '../../../db/mongo/base.repository';
import { PermissionModel } from './permission.model';
import { IPermissionsRepository } from './repository-interface';

class PermissionsRepository extends MongoBaseRepository<PermissionModel> implements IPermissionsRepository<PermissionModel> {
  constructor() {
    super(getModelForClass(PermissionModel));
  }
}

export const permissionsRepository = new PermissionsRepository();
