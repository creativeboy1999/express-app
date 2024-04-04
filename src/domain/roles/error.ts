import { ERROR_CODES } from '../../common/constant/errors';
import { BaseException } from '../../common/errors/common.error';

export class RoleException extends BaseException {
  public static NotFound(data) {
    return new RoleException(ERROR_CODES.ROLE, 'Role not found', data);
  }
}
