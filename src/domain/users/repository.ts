import { getModelForClass } from '@typegoose/typegoose';
import { MongoBaseRepository } from '../../db/mongo/base.repository';
import { IUserRepository } from './repository-interface';
import { UserModel } from './model';
import { COLLECTIONS } from '../../common/constant';
import { RoleDto } from '../roles/dto/role.dto';

class UsersRepository extends MongoBaseRepository<UserModel> implements IUserRepository<UserModel> {
  constructor() {
    super(getModelForClass(UserModel));
  }

  async setPassword(id: string, password: string): Promise<UserModel> {
    return await this.model.updateOne({ _id: this.toObjectId(id) }, { password: password }).lean();
  }

  async getMe(id: string): Promise<UserModel & { role: RoleDto }> {
    const res = await this.model.aggregate([
      { $match: { _id: id, deletedAt: null } },
      {
        $lookup: {
          from: COLLECTIONS.roles,
          let: { userRoleId: '$roleId' },
          pipeline: [
            {
              $match: { _id: '$$userRoleId' },
            },
          ],
          as: 'roles',
        },
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          birthday: 1,
          email: 1,
          password: 1,
          phoneNumber: 1,
          role: {
            $first: '$roles',
          },
        },
      },
    ]);

    return res[0];
  }
}

export const usersRepositoryInstance = new UsersRepository();
