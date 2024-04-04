import { RoleModel } from '../../../domain/roles/model';
export declare const roles: RoleModel[];
export declare function seedRoles(): Promise<import("mongodb").BulkWriteResult>;
