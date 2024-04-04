import { NextFunction, Request, Response } from 'express';
import { LogDto, LogPagingDto } from './dto';
import { ILogsRepository } from './repository-interface';
import { LogModel } from './model';
export declare class LogsService {
    private readonly logsRepository;
    constructor(logsRepository?: ILogsRepository<LogModel>);
    create(data: Partial<LogDto>): Promise<LogDto>;
    findAll(query: LogPagingDto): Promise<ResponsePaging<LogDto>>;
    middleware(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const logsServiceInstance: LogsService;
