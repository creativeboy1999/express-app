export interface IMongoDataBase {
    initialize(): Promise<Error | null>;
    closeConnection(): Promise<Error | null>;
}
