import { UserJWTPayloadDto } from './auth/dto';
declare module 'express' {
    interface Request {
        user?: UserJWTPayloadDto;
    }
}
