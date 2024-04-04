import { Request, Response } from 'express';
import { IUsersService } from './service.interface';
declare class UsersController {
    private readonly usersService;
    constructor(usersService?: IUsersService);
    create(req: Request, res: Response): Promise<void>;
    updateById(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAll(req: Request, res: Response): Promise<void>;
    deletedById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare const usersController: UsersController;
export {};
