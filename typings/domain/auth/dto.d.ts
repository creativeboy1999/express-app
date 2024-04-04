import { JwtPayload } from 'jsonwebtoken';
export interface UserJWTPayloadDto extends JwtPayload {
    id: string;
    roleId: string;
}
