import { NextFunction, Request, Response } from 'express';
import { AuthException } from './error';
import { authServiceInstance } from './service';
import { IAuthService } from './service.interface';
import { Permissions } from '../roles/permission/enum';
import { AuthDto, AuthDtoGroup } from './class-validator';
import { validateIt } from '../../common/validation/validate';
import { telegramBot } from '../../common/telegram/telegram-bot';
import { UserDto, UserDtoGroup } from '../users/class-validator';
import { isMongoId } from 'class-validator';

class AuthController {
  constructor(private readonly authService: IAuthService = authServiceInstance) {
    this.login = this.login.bind(this);
    this.authorizeUser = this.authorizeUser.bind(this);
    this.checkPermission = this.checkPermission.bind(this);
    this.getMe = this.getMe.bind(this);
  }

  async register(req: Request, res: Response) {
    try {
      const body = await validateIt(req.body, UserDto, [UserDtoGroup.CREATE]);

      const user = await this.authService.register(body);

      res.success(user);
    } catch (err) {
      const jsonStringErr = JSON.stringify(err);

      telegramBot.sendMessage(
        (jsonStringErr !== '{}' ? jsonStringErr : err.message) + '\n\nerror while login',
      );
      res.status(401).send(AuthException.InvalidLoginOrPassword());
    }
  }

  async login(req: Request, res: Response) {
    try {
      const body = await validateIt(req.body, AuthDto, [AuthDtoGroup.LOGIN]);

      const user = await this.authService.login(body.email, body.password);

      res.success(user);
    } catch (err) {
      const jsonStringErr = JSON.stringify(err);

      telegramBot.sendMessage(
        (jsonStringErr !== '{}' ? jsonStringErr : err.message) + '\n\nerror while login',
      );
      res.status(401).send(AuthException.InvalidLoginOrPassword());
    }
  }

  public async getMe(req: Request, res: Response) {
    const id = req.user?.id;

    if (!isMongoId(id)) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    const user = await this.authService.getMe(id);

    res.success(user);
  }

  async authorizeUser(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    // const token = req.cookies.session_token;
    if (!token) {
      return res.status(401).json(AuthException.Unauthorized());
    }

    try {
      const decoded = await this.authService.verifyJwt(token);

      // Check if the user's role is authorized to access the endpoint
      if (!decoded) {
        return res.status(401).json(AuthException.Unauthorized());
      }

      const redisUser = await this.authService.getRedisUser(decoded.id);
      if (!redisUser) return res.status(401).json(AuthException.Unauthorized());

      // Add the user's ID and role to the request object for later use
      req.user = decoded;

      switch (req.method.toLocaleLowerCase()) {
        case 'delete': {
          if (req.body && !Array.isArray(req.body)) {
            req.body.deletedBy = decoded.id;
          }
          break;
        }
        case 'post': {
          if (req.body && !Array.isArray(req.body)) {
            req.body.createdBy = decoded.id;
          }
          break;
        }
      }

      next();
    } catch (err) {
      telegramBot.sendMessage(err.toString() + '\n\nerror while authorizeUser');

      return res.status(401).json(AuthException.Unauthorized());
    }
  }

  checkPermission(requiredPermissions: Permissions[] = []) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const user = req.user;
      if (!user) return res.status(401).json(AuthException.Unauthorized());
      const redisUser = await this.authService.getRedisUser(user.id);

      // Check if the user's role is authorized to access the endpoint
      if (requiredPermissions.length === 0) {
        return next();
      }

      for (const requiredPermission of requiredPermissions) {
        if (redisUser.role.permissions[requiredPermission].can != true) {
          return res
            .status(403)
            .json(AuthException.NotEnoughPermission({ role: { title: redisUser.role.title } }));
        }
      }

      return next();
    };
  }
}

export const authController = new AuthController();
