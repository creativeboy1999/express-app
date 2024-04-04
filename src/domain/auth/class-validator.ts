import { IsString } from 'class-validator';
import { BaseDtoGroup } from '../../common/validation/dto/common.dto';

export class AuthDtoGroup extends BaseDtoGroup {
  static readonly LOGIN = 'login';
  static readonly CHANGE_PASSWORD = 'change_password';
}
export class AuthDto {
  @IsString({ groups: [AuthDtoGroup.LOGIN] })
  email: string;

  @IsString({ groups: [AuthDtoGroup.LOGIN, AuthDtoGroup.CHANGE_PASSWORD] })
  password: string;
}
