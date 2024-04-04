import { BaseDto, BaseDtoGroup } from '../../../common/validation/dto/common.dto';
import { Permissions } from './enum';
export declare class PermissionDtoGroup extends BaseDtoGroup {
}
export declare class PermissionDto extends BaseDto {
    title: Permissions;
}
