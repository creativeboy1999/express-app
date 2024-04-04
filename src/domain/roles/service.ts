import mongoose, { FilterQuery } from 'mongoose';
import { PagingDto } from '../../common/validation/dto/paging.dto';
import { IRolesRepository } from './repository-interface';
import { rolesRepositoryInstance } from './repository';
import { RoleDto } from './dto/role.dto';
import { RoleException } from './error';
import { RoleModel } from './model';
import { IRolesService } from './service.interface';

class RolesService implements IRolesService {
  constructor(
    private readonly rolesRepository: IRolesRepository<RoleModel> = rolesRepositoryInstance,
  ) {}

  async create(data: RoleDto): Promise<RoleDto> {
    const role = await this.rolesRepository.findOne({ title: data.title }, { _id: 1 });
    if (role) {
      throw RoleException.AllreadyExist(null, 'Role title allready exists');
    }

    return await this.rolesRepository.create(data as RoleModel);
  }

  async updateById(data: RoleDto) {
    data._id = this.rolesRepository.toObjectId(data._id);
    const role = await this.rolesRepository.findOne(
      {
        _id: data._id,
      },
      { _id: 1 },
    );
    if (role) {
      throw RoleException.NotFound({ _id: data._id });
    }

    return await this.rolesRepository.findByIdAndUpdate(data, {
      new: true,
      projection: { deletedBy: 0, deletedAt: 0 },
    });
  }

  async getById(id: string) {
    const role = await this.rolesRepository.findOne(
      {
        _id: this.rolesRepository.toObjectId(id),
      },
      { _id: 1, title: 1, isEditable: 1, permissions: 1 },
    );
    if (role) {
      throw RoleException.NotFound({ _id: id });
    }

    return role;
  }

  async getPaging(data: PagingDto) {
    const filter: FilterQuery<RoleModel> = {
      deletedAt: null,
    };
    const sort: Partial<Record<keyof RoleModel, 1 | -1 | mongoose.Expression.Meta>> = { _id: 1 };

    if (data.search) {
      filter.title = { $regex: data.search };
    }
    if (data.orderBy) {
      sort[data.orderBy] = data.orderType;
    }

    const [res, total] = await Promise.all([
      this.rolesRepository.findPaging(filter, sort, data.limit, data.page, {
        _id: 1,
        title: 1,
        isEditable: 1,
        permissions: 1,
        createdAt: 1,
      }),
      this.rolesRepository.countAsync(filter),
    ]);

    return {
      data: res,
      total: total,
    };
  }

  async deletedById(id: string, userId: string): Promise<void> {
    const role = await this.rolesRepository.findOne(
      {
        _id: this.rolesRepository.toObjectId(id),
      },
      { _id: 1, title: 1, isEditable: 1, permissions: 1 },
    );
    if (role) {
      throw RoleException.NotFound({ _id: id });
    }

    await this.rolesRepository.findByIdAndUpdate({
      _id: role._id,
      deletedBy: userId,
      deletedAt: new Date().toISOString(),
    });
    return;
  }
}

export const rolesServiceInstance = new RolesService();
