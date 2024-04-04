import { IsArray, IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RolePermissionDto } from './role-permission.dto';
import { BaseDto, BaseDtoGroup } from '../../../common/validation/dto/common.dto';

export class RoleDtoGroup extends BaseDtoGroup {}

export class RoleDto extends BaseDto {
  @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
  @IsString({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE],
  })
  title: string;

  @IsOptional({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE],
  })
  isEditable: boolean;

  @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
  @IsArray({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
  @ValidateNested({
    each: true,
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE],
  })
  @Type(() => RolePermissionDto)
  permissions?: RolePermissionDto[];
}
