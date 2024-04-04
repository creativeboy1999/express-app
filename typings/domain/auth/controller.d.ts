import { NextFunction, Request, Response } from 'express';
import { IAuthService } from './service.interface';
import { Permissions } from '../roles/permission/enum';
declare class AuthController {
    private readonly authService;
    constructor(authService?: IAuthService);
    register(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
    getMe(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    authorizeUser(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    checkPermission(requiredPermissions?: Permissions[]): (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
}
export declare const authController: AuthController;
export {};
