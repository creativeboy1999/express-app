import { MongoBaseModel } from '../../db/mongo/base.model';
export declare class UserModel extends MongoBaseModel {
    email: string;
    password: string;
    firstName: string;
    lastName?: string;
    roleId?: string;
    phoneNumber?: string;
    birthday?: string;
}
