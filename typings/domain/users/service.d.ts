import { IUserRepository } from './repository-interface';
import { UserModel } from './model';
import { UserDto } from './class-validator';
import { IUsersService } from './service.interface';
import { PagingDto } from '../../common/validation/dto/paging.dto';
declare class UsersService implements IUsersService {
    private readonly usersRepository;
    constructor(usersRepository?: IUserRepository<UserModel>);
    create(data: UserDto): Promise<UserDto>;
    updateById(id: string, data: UserDto): Promise<UserModel>;
    getById(id: string): Promise<UserModel>;
    getPaging(data: PagingDto): Promise<{
        data: UserModel[];
        total: number;
    }>;
    deletedById(id: string, userId: string): Promise<void>;
}
export declare const usersServiceInstance: UsersService;
export {};
