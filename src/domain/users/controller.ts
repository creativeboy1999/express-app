import { validateIt } from '../../common/validation/validate';
import { Request, Response } from 'express';
import { usersServiceInstance } from './service';
import { isMongoId } from 'class-validator';
import { StatusCodes } from '../../common/utility/status-codes';
import { UserDto, UserDtoGroup } from './class-validator';
import { IUsersService } from './service.interface';
import { PagingDto } from '../../common/validation/dto/paging.dto';

class UsersController {
  constructor(private readonly usersService: IUsersService = usersServiceInstance) {
    this.create = this.create.bind(this);
    this.updateById = this.updateById.bind(this);
    this.getById = this.getById.bind(this);
    this.getAll = this.getAll.bind(this);
    this.deletedById = this.deletedById.bind(this);
  }

  async create(req: Request, res: Response) {
    const body = await validateIt(req.body, UserDto, [UserDtoGroup.CREATE]);

    const user = await this.usersService.create(body);
    res.success(user, {}, StatusCodes.CREATED);
  }

  async updateById(req: Request, res: Response) {
    const body = await validateIt(req.body, UserDto, [UserDtoGroup.UPDATE]);

    const user = await this.usersService.updateById(body._id.toString(), body);
    res.success(user);
  }

  public async getById(req: Request, res: Response) {
    const id = req.params.id;

    if (!isMongoId(id)) {
      return res.status(400).send({ message: 'Invalid user id' });
    }

    const user = await this.usersService.getById(id);

    res.success(user);
  }

  public async getAll(req: Request, res: Response) {
    req.query.complexId = req.headers['complex-id'];

    const query = await validateIt(req.query, PagingDto, [UserDtoGroup.PAGINATION]);

    const data = await this.usersService.getPaging(query);

    res.success(data.data, {
      currentPage: query.page,
      limit: query.limit,
      totalCount: data.total,
      pageCount: Math.ceil(data.total / query.limit),
    });
  }

  public async deletedById(req: Request, res: Response) {
    const id = req.params.id;

    if (!isMongoId(id)) return res.status(400).json({ error: 'invalid id' });

    await this.usersService.deletedById(id, req.user.id);

    res.success({ id: id });
  }
}

export const usersController = new UsersController();
