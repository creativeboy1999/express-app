import { Types } from 'mongoose';
import { rolesRepositoryInstance } from '../../../domain/roles/repository';
import { RoleModel } from '../../../domain/roles/model';
import { permissionsSeed } from './permissions.seed';

export const roles: RoleModel[] = [
  {
    _id: new Types.ObjectId(),
    title: 'Boss',
    isEditable: false,
    permissions: permissionsSeed.map((permission) => ({
      title: permission.title,
      can: true,
      permissionId: permission._id.toString(),
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
    deletedBy: null,
  },
];

export async function seedRoles() {
  return await rolesRepositoryInstance.getModel().bulkWrite(
    roles.map((role) => ({
      updateOne: {
        filter: { title: role.title, deletedAt: null },
        update: {
          $set: {
            title: role.title,
            isEditable: role.isEditable,
            permissions: role.permissions,
          },
          $inc: { __v: 1 },
        },
        upsert: true,
      },
    })),
  );
}
