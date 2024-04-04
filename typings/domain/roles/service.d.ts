import { PagingDto } from '../../common/validation/dto/paging.dto';
import { IRolesRepository } from './repository-interface';
import { RoleDto } from './dto/role.dto';
import { RoleModel } from './model';
import { IRolesService } from './service.interface';
declare class RolesService implements IRolesService {
    private readonly rolesRepository;
    constructor(rolesRepository?: IRolesRepository<RoleModel>);
    create(data: RoleDto): Promise<RoleDto>;
    updateById(data: RoleDto): Promise<RoleModel>;
    getById(id: string): Promise<RoleModel>;
    getPaging(data: PagingDto): Promise<{
        data: RoleModel[];
        total: number;
    }>;
    deletedById(id: string, userId: string): Promise<void>;
}
export declare const rolesServiceInstance: RolesService;
export {};
