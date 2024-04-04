import { Request, Response } from 'express';
export declare const globalErrorHandler: (err: any, request: Request, response: Response, next: any) => Response<any, Record<string, any>>;
