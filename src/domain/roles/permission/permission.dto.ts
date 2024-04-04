import { IsOptional, IsString } from 'class-validator';
import { BaseDto, BaseDtoGroup } from '../../../common/validation/dto/common.dto';
import { Permissions } from './enum';

export class PermissionDtoGroup extends BaseDtoGroup {}

export class PermissionDto extends BaseDto {
  @IsOptional({ groups: [PermissionDtoGroup.UPDATE] })
  @IsString({
    groups: [PermissionDtoGroup.CREATE, PermissionDtoGroup.UPDATE],
  })
  title: Permissions;
}
