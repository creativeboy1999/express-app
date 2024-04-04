import { Types } from 'mongoose';
import { UserModel } from '../../../domain/users/model';
import { usersRepositoryInstance } from '../../../domain/users/repository';
import { roles } from './roles.seed';
import { authServiceInstance } from '../../../domain/auth/service';

export async function seedUsers() {
  const users: UserModel[] = [
    {
      _id: new Types.ObjectId(),
      email: 'creativeboy1999@gmail.com',
      firstName: 'Umar',
      lastName: 'Akbarov',
      password: await authServiceInstance.generateHash('123123'),
      birthday: '',
      phoneNumber: '+998945434567',
      roleId: roles[0]._id.toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
      deletedBy: null,
    },
  ];

  return await usersRepositoryInstance.getModel().bulkWrite(
    users.map((user) => ({
      updateOne: {
        filter: { email: user.email, deletedAt: null },
        update: {
          $set: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            birthday: user.birthday,
            phoneNumber: user.phoneNumber,
            roleId: user.roleId,
          },
          $inc: { __v: 1 },
        },
        upsert: true,
      },
    })),
  );
}
