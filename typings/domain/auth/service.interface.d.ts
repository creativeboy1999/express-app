import { UserModel } from '../users/model';
import { RedisUserEntity } from '../../db/redis/entities/users.entity';
import { RoleDto } from '../roles/dto/role.dto';
import { UserDto } from '../users/class-validator';
import { UserJWTPayloadDto } from './dto';
export interface IAuthService {
    register(body: UserDto): any;
    login(email: string, password: string): any;
    setPassword(id: string, password: string): any;
    getMe(id: string): Promise<Partial<UserModel & {
        role: RoleDto;
    }>>;
    setRedisUser(userId: string): Promise<RedisUserEntity>;
    getRedisUser(userId: string): Promise<RedisUserEntity>;
    generateHash(password: string): any;
    verifyJwt(token: string): Promise<UserJWTPayloadDto>;
}
