import { Request, Response } from 'express';
import { IRolesService } from './service.interface';
declare class RolesController {
    private readonly rolesService;
    constructor(rolesService?: IRolesService);
    create(req: Request, res: Response): Promise<void>;
    updateById(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAll(req: Request, res: Response): Promise<void>;
    deletedById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare const rolesController: RolesController;
export {};
