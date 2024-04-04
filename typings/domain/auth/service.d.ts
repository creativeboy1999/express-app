/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { IUserRepository } from '../users/repository-interface';
import { UserModel } from '../users/model';
import { IRedisUsersRepository } from '../../db/redis/repositories-interface/users.repository';
import { RedisUserEntity } from '../../db/redis/entities/users.entity';
import { UserJWTPayloadDto } from './dto';
import { RoleDto } from '../roles/dto/role.dto';
import { UserDto } from '../users/class-validator';
import { IAuthService } from './service.interface';
declare class AuthService implements IAuthService {
    private readonly usersRepository;
    private readonly redisUserRepository;
    constructor(usersRepository?: IUserRepository<UserModel>, redisUserRepository?: IRedisUsersRepository<RedisUserEntity>);
    register(body: UserDto): Promise<UserModel>;
    login(email: string, password: string): Promise<{
        token: {
            accessToken: string;
            refreshToken: string;
        };
        email: string;
        password: string;
        firstName: string;
        lastName?: string;
        roleId?: string;
        phoneNumber?: string;
        birthday?: string;
        _id: import("mongoose").Types.ObjectId;
        updatedAt: string;
        createdAt: string;
        deletedBy: string;
        deletedAt: string;
    }>;
    setPassword(id: string, password: string): Promise<UserModel>;
    getMe(id: string): Promise<Partial<UserModel & {
        role: RoleDto;
    }>>;
    setRedisUser(userId: string): Promise<RedisUserEntity>;
    getRedisUser(userId: string): Promise<RedisUserEntity>;
    generateHash(password: string): Promise<string>;
    private comparePassword;
    private signAsync;
    verifyJwt(token: string): Promise<UserJWTPayloadDto>;
}
export declare const authServiceInstance: AuthService;
export {};
