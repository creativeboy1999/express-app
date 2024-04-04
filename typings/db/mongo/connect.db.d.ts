import { IMongoDataBase } from './mongo.interface';
export declare class MongoDataBase implements IMongoDataBase {
    initialize(): Promise<Error | null>;
    closeConnection(): Promise<Error | null>;
}
export declare const mongoDataBase: MongoDataBase;
