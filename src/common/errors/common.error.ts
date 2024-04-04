import { ValidationError } from 'class-validator';
import { ERROR_CODES } from '../constant/errors';

export class BaseException {
  constructor(
    public readonly code: number,
    public readonly message: string,
    public readonly data: unknown,
    public readonly meta: unknown = {},
    public readonly success: boolean = false,
    public readonly time = new Date().toISOString(),
  ) {}

  public static Success(data: unknown, meta: unknown) {
    return new BaseException(0, 'Success', data, meta);
  }

  public static UnknownError(data?: unknown, meta: unknown = {}) {
    return new BaseException(ERROR_CODES.BASE, 'Unknown error', data, meta);
  }

  public static ValidationError(data?: ValidationError[] | string) {
    return new BaseException(ERROR_CODES.BASE + 1, 'Validation Error', data);
  }

  static AllreadyExist(data, message) {
    return new BaseException(ERROR_CODES.BASE + 2, `Already exist , message: ${message}`, data);
  }

  static InternalServerError() {
    return new BaseException(500, `Internal server error`, null);
  }

  static NotFound(code: number, data: string) {
    return new BaseException(code, `${data} not found`, null);
  }
}
