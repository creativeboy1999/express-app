import {
  IsEmail,
  IsMongoId,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { BaseDto, BaseDtoGroup } from '../../common/validation/dto/common.dto';
import { regexps } from '../../common/constant/regex';
import { Type } from 'class-transformer';
import { RoleDto } from '../roles/dto/role.dto';

export class UserDtoGroup extends BaseDtoGroup {}

export class UserDto extends BaseDto {
  @IsOptional({ groups: [UserDtoGroup.UPDATE] })
  @IsString({ groups: [UserDtoGroup.CREATE, UserDtoGroup.UPDATE] })
  firstName: string;

  @IsOptional({ groups: [UserDtoGroup.CREATE, UserDtoGroup.UPDATE] })
  @IsString({ groups: [UserDtoGroup.CREATE, UserDtoGroup.UPDATE] })
  lastName?: string;

  @IsOptional({ groups: [UserDtoGroup.CREATE, UserDtoGroup.UPDATE] })
  @Matches(regexps.DATE_FORMAT_YYYY_MM_DD, {
    groups: [UserDtoGroup.CREATE, UserDtoGroup.UPDATE],
  })
  birthday?: string;

  @IsOptional({ groups: [UserDtoGroup.UPDATE] })
  @IsString({ groups: [UserDtoGroup.CREATE, UserDtoGroup.UPDATE] })
  @MinLength(7, { groups: [UserDtoGroup.CREATE, UserDtoGroup.UPDATE] })
  password: string;

  @IsOptional({ groups: [UserDtoGroup.UPDATE] })
  @IsEmail({ groups: [UserDtoGroup.CREATE, UserDtoGroup.UPDATE] })
  email: string;

  @IsOptional({ groups: [UserDtoGroup.CREATE, UserDtoGroup.UPDATE] })
  @Matches(regexps.UZ_PHONE_NUMBER, { groups: [UserDtoGroup.CREATE, UserDtoGroup.UPDATE] })
  phoneNumber?: string;

  @IsOptional({ groups: [UserDtoGroup.CREATE, UserDtoGroup.UPDATE] })
  @IsMongoId({ groups: [UserDtoGroup.CREATE, UserDtoGroup.UPDATE] })
  roleId?: string;

  @IsOptional({ groups: [] })
  @IsString({ groups: [] })
  @ValidateNested({
    each: true,
    groups: [],
  })
  @Type(() => RoleDto)
  role?: RoleDto;
}
