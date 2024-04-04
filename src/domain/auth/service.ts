import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthException } from './error';
import { ENV } from '../../common/config';
import { redisDatabaseInstance } from '../../db/redis/connection';
import { IUserRepository } from '../users/repository-interface';
import { UserModel } from '../users/model';
import { usersRepositoryInstance } from '../users/repository';
import { IRedisUsersRepository } from '../../db/redis/repositories-interface/users.repository';
import { RedisUserEntity } from '../../db/redis/entities/users.entity';
import { ERROR_CODES } from '../../common/constant';
import { UserJWTPayloadDto } from './dto';
import { Permissions } from '../roles/permission/enum';
import { RolePermissionDto } from '../roles/dto/role-permission.dto';
import { RoleDto } from '../roles/dto/role.dto';
import { UserDto } from '../users/class-validator';
import { IAuthService } from './service.interface';

class AuthService implements IAuthService {
  constructor(
    private readonly usersRepository: IUserRepository<UserModel> = usersRepositoryInstance,
    private readonly redisUserRepository: IRedisUsersRepository<RedisUserEntity> = redisDatabaseInstance
      .repos.usersRepo,
  ) {}

  async register(body: UserDto) {
    const user = await this.usersRepository.findOne({ email: body.email }, { email: 1 });
    if (user) {
      throw AuthException.AllreadyExist(null, 'User allready exists');
    }

    user.roleId = null;
    user.password = await this.generateHash(user.password);

    return await this.usersRepository.create(body as unknown);
  }

  async login(email: string, password: string) {
    // Query the database to retrieve the user with the given email
    const user = await this.usersRepository.findOne(
      { email: email },
      {
        firstName: 1,
        lastName: 1,
        birthday: 1,
        email: 1,
        password: 1,
        phoneNumber: 1,
      },
    );

    if (!user) {
      throw AuthException.InvalidLoginOrPassword();
    }

    // Verify the user's credentials
    const compare = await this.comparePassword(password, user.password);
    if (!compare) {
      throw AuthException.InvalidLoginOrPassword();
    }

    user.password = undefined;

    // Generate a token or session for the user
    const payload: UserJWTPayloadDto = { id: user._id.toString(), roleId: user.roleId };

    const [accessToken, refreshToken] = await Promise.all([
      this.signAsync(payload, ENV.JWT_SECRET_ACCESS, { expiresIn: '1 days' }),
      this.signAsync(payload, ENV.JWT_SECRET_REFRESH, { expiresIn: '7 days' }),
    ]);

    return { ...user, token: { accessToken, refreshToken } };
  }

  async setPassword(id: string, password: string) {
    const user = await this.usersRepository.findById(id, {
      firstName: 1,
      lastName: 1,
      birthday: 1,
      email: 1,
      password: 1,
      phoneNumber: 1,
    });

    if (!user) {
      throw AuthException.NotFound(ERROR_CODES.USER, 'User');
    }

    user.password = await this.generateHash(password); // hashed pass
    await this.usersRepository.findByIdAndUpdate(user);
    user.password = undefined;

    return user;
  }

  async getMe(id: string): Promise<Partial<UserModel & { role: RoleDto }>> {
    const user = await this.usersRepository.getMe(id);
    if (!user) {
      throw AuthException.NotFound(ERROR_CODES.USER, 'User');
    }

    return user;
  }

  async setRedisUser(userId: string): Promise<RedisUserEntity> {
    const user = await this.usersRepository.getMe(userId);

    if (!user) {
      throw AuthException.NotFound(ERROR_CODES.USER, 'User');
    }
    let permissions: Record<Permissions, RolePermissionDto>;

    for (const permission of user.role.permissions) {
      permissions[permission.title] = permission;
    }

    const redisUser = {
      id: userId,
      role: {
        title: user.role.title,
        permissions,
      },
    };
    await this.redisUserRepository.set(userId, redisUser);
    return redisUser;
  }

  async getRedisUser(userId: string): Promise<RedisUserEntity> {
    let redisUser = await this.redisUserRepository.get(userId);
    if (redisUser) {
      return redisUser;
    }
    return await this.setRedisUser(userId);
  }

  generateHash(password: string) {
    return new Promise<string>((resolve, reject) => {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) return reject(err);

        bcrypt.hash(password, salt, function (err, hash) {
          if (err) return reject(err);

          resolve(hash);
        });
      });
    });
  }

  private comparePassword(password: string, hash: string) {
    return new Promise<boolean>((resolve, reject) => {
      bcrypt.compare(password, hash, (err, result) => (err ? reject(err) : resolve(result)));
    });
  }

  private signAsync(
    payload: UserJWTPayloadDto,
    secret: string,
    options?: jwt.SignOptions,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, options, (err: Error | null, token: string) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }

  public verifyJwt(token: string): Promise<UserJWTPayloadDto> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, ENV.JWT_SECRET_ACCESS, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded as UserJWTPayloadDto);
        }
      });
    });
  }
}

export const authServiceInstance = new AuthService();
