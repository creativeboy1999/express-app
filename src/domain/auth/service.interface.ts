import { UserModel } from '../users/model';
import { RedisUserEntity } from '../../db/redis/entities/users.entity';
import { RoleDto } from '../roles/dto/role.dto';
import { UserDto } from '../users/class-validator';
import { UserJWTPayloadDto } from './dto';

export interface IAuthService {
  register(body: UserDto);
  login(email: string, password: string);
  setPassword(id: string, password: string);
  getMe(id: string): Promise<Partial<UserModel & { role: RoleDto }>>;

  setRedisUser(userId: string): Promise<RedisUserEntity>;
  getRedisUser(userId: string): Promise<RedisUserEntity>;

  generateHash(password: string);
  verifyJwt(token: string): Promise<UserJWTPayloadDto>;
}
