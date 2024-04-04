import { UserJWTPayloadDto } from './auth/dto';

declare module 'express' {
  export interface Request {
    user?: UserJWTPayloadDto;
  }
}
