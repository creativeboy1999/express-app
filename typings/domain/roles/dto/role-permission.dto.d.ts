import { BaseDtoGroup } from '../../../common/validation/dto/common.dto';
import { Permissions } from '../permission/enum';
export declare class RolePermissionDtoGroup extends BaseDtoGroup {
}
export declare class RolePermissionDto {
    title: Permissions;
    permissionId: string;
    can: boolean;
}
