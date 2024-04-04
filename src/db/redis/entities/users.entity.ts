import { RolePermissionDto } from '../../../domain/roles/dto/role-permission.dto';
import { Permissions } from '../../../domain/roles/permission/enum';

export class RedisUserEntity {
  id: string;
  role: {
    title: string;
    permissions: Record<Permissions, RolePermissionDto>;
  };
}
