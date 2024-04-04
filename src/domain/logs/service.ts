import { FilterQuery } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { LogDto, LogPagingDto } from './dto';
import { ILogsRepository } from './repository-interface';
import { LogModel } from './model';
import { logsRepositoryInstance } from './repository';

export class LogsService {
  constructor(private readonly logsRepository: ILogsRepository<LogModel> = logsRepositoryInstance) {
    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.middleware = this.middleware.bind(this);
  }

  async create(data: Partial<LogDto>): Promise<LogDto> {
    return await this.logsRepository.create(data as LogModel);
  }

  async findAll(query: LogPagingDto): Promise<ResponsePaging<LogDto>> {
    const limit = query.limit;
    const page = query.page;
    const filter: FilterQuery<LogDto> = {};

    if (query.search) {
      filter.requestPath = new RegExp(query.search);
    }
    if (query.byMethod) {
      filter.requestMethod = query.byMethod;
    }

    const [logs, totalCount] = await Promise.all([
      this.logsRepository.findPaging(filter, { createdAt: -1 }, limit, page),
      this.logsRepository.countAsync(filter),
    ]);

    return {
      meta: {
        limit: query.limit,
        currentPage: query.page,
        totalPages: Math.ceil(totalCount / query.limit),
        totalCount: totalCount,
      },
      data: logs,
    };
  }

  async middleware(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.path === '/logs') {
        return next();
      }

      const logData: Partial<LogDto> = {
        requestOn: new Date().toISOString(),
        requestPath: req.path,
        requestMethod: req.method,
        requestHeader: req.headers,
        requestQuery: req.query,
        requestBody: req.body,
        requestUser: req.user,
        cookies: req.cookies,
        signedCookies: req.signedCookies,
      };

      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      const oldJSON = res.json;

      res.json = (data) => {
        logData.responseBody = data;
        logData.responseOn = new Date().toISOString();

        self.create(logData).catch();

        return oldJSON.call(res, data);
      };

      next();
    } catch (error) {
      console.log('===== error logger middleware =====', error);
    }
  }
}

export const logsServiceInstance = new LogsService();
