import { ValidationError } from 'class-validator';

export {};

declare global {
  interface PagingSuccessResponse<T = unknown> {
    data: T[];
    meta: {
      limit: number;
      currentPage: number;
      totalPages: number;
      totalCount: number;
    };
  }

  interface PagingFailResponse {
    errors: ValidationError[];
    message: string;
    meta: { code: number; statusCode: number };
  }

  // type ResponsePaging<T = any> = PagingSuccessResponse<T> | PagingFailResponse;
  type ResponsePaging<T = unknown> = PagingSuccessResponse<T>;
}
