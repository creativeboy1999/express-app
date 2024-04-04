import { BaseException } from '../../common/errors/common.error';
export declare class RoleException extends BaseException {
    static NotFound(data: any): RoleException;
}
