import { MongoBaseRepository } from '../../../db/mongo/base.repository';
import { PermissionModel } from './permission.model';
import { IPermissionsRepository } from './repository-interface';
declare class PermissionsRepository extends MongoBaseRepository<PermissionModel> implements IPermissionsRepository<PermissionModel> {
    constructor();
}
export declare const permissionsRepository: PermissionsRepository;
export {};
