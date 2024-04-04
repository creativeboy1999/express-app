import { BaseException } from '../../common/errors/common.error';
export declare class AuthException extends BaseException {
    static InvalidLoginOrPassword(): AuthException;
    static Unauthorized(data?: any): AuthException;
    static NotEnoughPermission(data?: any): AuthException;
    static CannotDeleteAdmin(data?: any): AuthException;
}
