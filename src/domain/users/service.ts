import { UserException } from './error';
import { IUserRepository } from './repository-interface';
import { UserModel } from './model';
import { usersRepositoryInstance } from './repository';
import { UserDto } from './class-validator';
import { authServiceInstance } from '../auth/service';
import { IUsersService } from './service.interface';
import { PagingDto } from '../../common/validation/dto/paging.dto';
import mongoose, { FilterQuery } from 'mongoose';

class UsersService implements IUsersService {
  constructor(
    private readonly usersRepository: IUserRepository<UserModel> = usersRepositoryInstance,
  ) {}

  async create(data: UserDto): Promise<UserDto> {
    data._id = this.usersRepository.newObjectId();
    data.password = await authServiceInstance.generateHash(data.password);
    const user = await this.usersRepository.create(data as UserModel);

    user.password = undefined;

    await authServiceInstance.setRedisUser(user._id.toString()).catch((err) => {
      console.log(err, 'error while set user to redis. On create user');
    });

    return user;
  }

  async updateById(id: string, data: UserDto) {
    const user = await this.usersRepository.findById(id, { _id: 1 });
    if (!user) {
      throw UserException.NotFound(null);
    }
    data._id = user._id;

    return await this.usersRepository.findByIdAndUpdate(data, {
      projection: {
        email: 1,
        firstName: 1,
        lastName: 1,
        birthday: 1,
        phoneNumber: 1,
      },
      new: true,
      lean: true,
    });
  }

  async getById(id: string) {
    const user = await this.usersRepository.findOne(
      { id: id },
      {
        _id: 1,
        birthday: 1,
        email: 1,
        firstName: 1,
        lastName: 1,
        phoneNumber: 1,
      },
    );

    if (!user) {
      throw UserException.NotFound(id);
    }

    return user;
  }

  async getPaging(data: PagingDto) {
    const filter: FilterQuery<UserModel> = {
      deletedAt: null,
    };
    const sort: Partial<Record<keyof UserModel, 1 | -1 | mongoose.Expression.Meta>> = { _id: 1 };

    if (data.search) {
      filter.title = { $regex: data.search };
    }
    if (data.orderBy) {
      sort[data.orderBy] = data.orderType;
    }

    const [res, total] = await Promise.all([
      this.usersRepository.findPaging(filter, sort, data.limit, data.page, {
        _id: 1,
        email: 1,
        firstName: 1,
        lastName: 1,
        birthday: 1,
        phoneNumber: 1,
        createdAt: 1,
      }),
      this.usersRepository.countAsync(filter),
    ]);

    return {
      data: res,
      total: total,
    };
  }

  async deletedById(id: string, userId: string): Promise<void> {
    const user = await this.usersRepository.findOne(
      {
        _id: this.usersRepository.toObjectId(id),
      },
      { _id: 1, title: 1, isEditable: 1, permissions: 1 },
    );
    if (user) {
      throw UserException.NotFound({ _id: id });
    }

    await this.usersRepository.findByIdAndUpdate({
      _id: user._id,
      deletedBy: userId,
      deletedAt: new Date().toISOString(),
    });
    return;
  }
}

export const usersServiceInstance = new UsersService();
