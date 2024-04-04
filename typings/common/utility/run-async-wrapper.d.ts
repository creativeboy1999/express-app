import { NextFunction, Request, Response } from 'express';
export declare function runAsyncWrapper(callback: any): (req: Request, res: Response, next: NextFunction) => Promise<void>;
