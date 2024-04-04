import { NextFunction, Request, Response } from 'express';

export function runAsyncWrapper(callback) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      console.log('1');

      await callback(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
