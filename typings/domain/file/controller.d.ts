import { Request, Response } from "express";
declare class FileController {
    private fileService;
    constructor();
    upload(req: Request, res: Response): Promise<void | Response<any, Record<string, any>>>;
    get(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare const fileController: FileController;
export {};
