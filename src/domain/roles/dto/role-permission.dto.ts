import { IsBoolean, IsEnum, IsMongoId, IsOptional } from 'class-validator';
import { BaseDtoGroup } from '../../../common/validation/dto/common.dto';
import { Permissions } from '../permission/enum';

export class RolePermissionDtoGroup extends BaseDtoGroup {}

export class RolePermissionDto {
  @IsOptional({ groups: [RolePermissionDtoGroup.UPDATE] })
  @IsEnum(Permissions, {
    groups: [RolePermissionDtoGroup.CREATE, RolePermissionDtoGroup.UPDATE],
  })
  public title: Permissions;

  @IsOptional({ groups: [RolePermissionDtoGroup.UPDATE] })
  @IsMongoId({
    groups: [RolePermissionDtoGroup.CREATE, RolePermissionDtoGroup.UPDATE],
  })
  public permissionId: string;

  @IsOptional({ groups: [RolePermissionDtoGroup.UPDATE] })
  @IsBoolean({
    groups: [RolePermissionDtoGroup.CREATE, RolePermissionDtoGroup.UPDATE],
  })
  public can: boolean;
}
