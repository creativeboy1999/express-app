import { ERROR_CODES } from '../../common/constant/errors';
import { BaseException } from '../../common/errors/common.error';

export class AuthException extends BaseException {
  public static InvalidLoginOrPassword() {
    return new AuthException(ERROR_CODES.AUTH + 1, 'Invalid email password ', null);
  }

  public static Unauthorized(data = null) {
    return new AuthException(ERROR_CODES.AUTH + 2, ' Unauthorized ', data);
  }

  public static NotEnoughPermission(data = null) {
    return new AuthException(ERROR_CODES.AUTH + 3, ' Not enough permission ', data);
  }

  public static CannotDeleteAdmin(data = null) {
    return new AuthException(ERROR_CODES.AUTH + 4, ` Cannot delete `, data);
  }
}
