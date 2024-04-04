import { BaseException } from '../../common/errors/common.error';
export declare class UserException extends BaseException {
    static NotFound(data?: unknown): UserException;
    static InvalidPassword(data: any): UserException;
    static Unauthorized(data?: any): UserException;
    static NotEnoughPermission(data?: any): UserException;
    static CannotDeleteYourSelf(data?: any): UserException;
}
