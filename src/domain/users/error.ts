import { ERROR_CODES } from '../../common/constant/errors';
import { BaseException } from '../../common/errors/common.error';

export class UserException extends BaseException {
  public static NotFound(data: unknown = null) {
    return new UserException(ERROR_CODES.USER, 'User not found', data);
  }

  public static InvalidPassword(data) {
    return new UserException(ERROR_CODES.USER + 1, 'Invalid password or username ', data);
  }

  public static Unauthorized(data = null) {
    return new UserException(ERROR_CODES.USER + 2, ' Unauthorized ', data);
  }

  public static NotEnoughPermission(data = null) {
    return new UserException(ERROR_CODES.USER + 3, ' Not enough permission ', data);
  }

  public static CannotDeleteYourSelf(data = null) {
    return new UserException(ERROR_CODES.USER + 7, ' Cannot delete your self', data);
  }
}
