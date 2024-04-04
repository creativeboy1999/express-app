import { validateIt } from '../../common/validation/validate';
import { Request, Response } from 'express';
import { rolesServiceInstance } from './service';
import { isMongoId } from 'class-validator';
import { PagingDto } from '../../common/validation/dto/paging.dto';
import { StatusCodes } from '../../common/utility/status-codes';
import { RoleDto, RoleDtoGroup } from './dto/role.dto';
import { IRolesService } from './service.interface';

class RolesController {
  constructor(private readonly rolesService: IRolesService = rolesServiceInstance) {
    this.create = this.create.bind(this);
    this.updateById = this.updateById.bind(this);
    this.getById = this.getById.bind(this);
    this.getAll = this.getAll.bind(this);
    this.deletedById = this.deletedById.bind(this);
  }

  async create(req: Request, res: Response) {
    const body = await validateIt(req.body, RoleDto, [RoleDtoGroup.CREATE]);

    const role = await this.rolesService.create(body);
    res.success(role, {}, StatusCodes.CREATED);
  }

  async updateById(req: Request, res: Response) {
    const body = await validateIt(req.body, RoleDto, [RoleDtoGroup.UPDATE]);

    const user = await this.rolesService.updateById(body);
    res.success(user);
  }

  public async getById(req: Request, res: Response) {
    const id = req.params.id;

    if (!isMongoId(id)) {
      return res.status(400).send({ message: 'Invalid user id' });
    }

    const user = await this.rolesService.getById(id);

    res.success(user);
  }

  public async getAll(req: Request, res: Response) {
    req.query.complexId = req.headers['complex-id'];

    const query = await validateIt(req.query, PagingDto, [RoleDtoGroup.PAGINATION]);

    const data = await this.rolesService.getPaging(query);

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

    await this.rolesService.deletedById(id, req.user.id);

    res.success({ id: id });
  }
}

export const rolesController = new RolesController();
