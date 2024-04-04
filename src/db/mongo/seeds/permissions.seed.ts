import { Types } from 'mongoose';
import { Permissions } from '../../../domain/roles/permission/enum';
import { permissionsRepository } from '../../../domain/roles/permission/repository';
import { PermissionModel } from '../../../domain/roles/permission/permission.model';

export const permissionsSeed: PermissionModel[] = Object.keys(Permissions).map((permissionKey) => ({
  _id: new Types.ObjectId(),
  title: Permissions[permissionKey],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: null,
  deletedBy: null,
}));

export async function seedPermissions() {
  return await permissionsRepository.getModel().bulkWrite(
    permissionsSeed.map((permission) => ({
      updateOne: {
        filter: { title: permission.title, deletedAt: null },
        update: {
          $set: {
            title: permission.title,
          },
          $inc: { __v: 1 },
        },
        upsert: true,
      },
    })),
  );
}
