import { NextFunction, Request, Response } from 'express';
import { BaseException } from '../errors/common.error';
import { StatusCodes } from './status-codes';
type IMeta = {
  total?: number;
  totalPages?: number;
  currentPage?: number;
  limit?: number;
} & Record<string, unknown>;

export const addMethodToResponse = (request: Request, response: Response, next: NextFunction) => {
  response.success = function (data, meta: IMeta = {}, httpCode = StatusCodes.OK) {
    if (data && Array.isArray(data.data) && data.total >= 0) {
      data = data.data;
      meta.total = data.total;
    }
    const success = BaseException.Success(data, meta);

    return response.status(httpCode).json(success);
  };
  next();
};

declare module 'express' {
  export interface Response {
    success: (data: any, meta?: object, httpCode?: StatusCodes) => void;
  }
}
