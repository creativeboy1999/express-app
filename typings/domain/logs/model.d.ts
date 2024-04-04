import { MongoBaseModel } from '../../db/mongo/base.model';
export declare class LogModel extends MongoBaseModel {
    cookies: unknown;
    signedCookies: unknown;
    requestOn?: string;
    responseOn?: string;
    requestPath: string;
    requestMethod: string;
    requestHeader: Record<string, unknown>;
    requestQuery: Record<string, unknown>;
    requestBody: Record<string, unknown>;
    responseBody: Record<string, unknown>;
    requestUser: Record<string, unknown>;
}
