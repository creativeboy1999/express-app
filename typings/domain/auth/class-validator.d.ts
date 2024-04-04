import { BaseDtoGroup } from '../../common/validation/dto/common.dto';
export declare class AuthDtoGroup extends BaseDtoGroup {
    static readonly LOGIN = "login";
    static readonly CHANGE_PASSWORD = "change_password";
}
export declare class AuthDto {
    email: string;
    password: string;
}
