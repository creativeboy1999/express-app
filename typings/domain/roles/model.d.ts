import { RolePermissionDto } from './dto/role-permission.dto';
import { MongoBaseModel } from '../../db/mongo/base.model';
export declare class RolePermissionModel {
    title: string;
    permissionId: string;
    can: boolean;
}
export declare class RoleModel extends MongoBaseModel {
    title: string;
    isEditable: boolean;
    permissions: RolePermissionDto[];
}
