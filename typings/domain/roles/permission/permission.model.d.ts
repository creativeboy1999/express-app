import { MongoBaseModel } from '../../../db/mongo/base.model';
import { Permissions } from './enum';
export declare class PermissionModel extends MongoBaseModel {
    title: Permissions;
}
