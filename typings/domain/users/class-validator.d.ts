import { BaseDto, BaseDtoGroup } from '../../common/validation/dto/common.dto';
import { RoleDto } from '../roles/dto/role.dto';
export declare class UserDtoGroup extends BaseDtoGroup {
}
export declare class UserDto extends BaseDto {
    firstName: string;
    lastName?: string;
    birthday?: string;
    password: string;
    email: string;
    phoneNumber?: string;
    roleId?: string;
    role?: RoleDto;
}
