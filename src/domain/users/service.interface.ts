import { PagingDto } from '../../common/validation/dto/paging.dto';
import { UserDto } from './class-validator';

export interface IUsersService {
  create(data: UserDto): Promise<UserDto>;

  updateById(id: string, data: UserDto);

  getById(id: string);

  getPaging(data: PagingDto);

  deletedById(id: string, userId: string): Promise<void>;
}
