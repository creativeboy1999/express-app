import { PagingDto } from '../../common/validation/dto/paging.dto';
import { UserDto } from './class-validator';
export interface IUsersService {
    create(data: UserDto): Promise<UserDto>;
    updateById(id: string, data: UserDto): any;
    getById(id: string): any;
    getPaging(data: PagingDto): any;
    deletedById(id: string, userId: string): Promise<void>;
}
