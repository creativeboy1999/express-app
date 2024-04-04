import { MongoBaseRepository } from '../../db/mongo/base.repository';
import { IUserRepository } from './repository-interface';
import { UserModel } from './model';
import { RoleDto } from '../roles/dto/role.dto';
declare class UsersRepository extends MongoBaseRepository<UserModel> implements IUserRepository<UserModel> {
    constructor();
    setPassword(id: string, password: string): Promise<UserModel>;
    getMe(id: string): Promise<UserModel & {
        role: RoleDto;
    }>;
}
export declare const usersRepositoryInstance: UsersRepository;
export {};
