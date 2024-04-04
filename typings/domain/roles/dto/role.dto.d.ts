import { RolePermissionDto } from './role-permission.dto';
import { BaseDto, BaseDtoGroup } from '../../../common/validation/dto/common.dto';
export declare class RoleDtoGroup extends BaseDtoGroup {
}
export declare class RoleDto extends BaseDto {
    title: string;
    isEditable: boolean;
    permissions?: RolePermissionDto[];
}
