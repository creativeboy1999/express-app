import { PagingDto } from '../../common/validation/dto/paging.dto';
import { RoleDto } from './dto/role.dto';

export interface IRolesService {
  create(data: RoleDto): Promise<RoleDto>;
  updateById(data: RoleDto);
  getById(id: string);
  getPaging(data: PagingDto);
  deletedById(id: string, userId: string): Promise<void>;
}
