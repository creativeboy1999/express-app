import { MongoBaseRepository } from '../../db/mongo/base.repository';
import { IRolesRepository } from './repository-interface';
import { RoleModel } from './model';
declare class RolesRepository extends MongoBaseRepository<RoleModel> implements IRolesRepository<RoleModel> {
    constructor();
}
export declare const rolesRepositoryInstance: RolesRepository;
export {};
