import { PermissionModel } from '../../../domain/roles/permission/permission.model';
export declare const permissionsSeed: PermissionModel[];
export declare function seedPermissions(): Promise<import("mongodb").BulkWriteResult>;
