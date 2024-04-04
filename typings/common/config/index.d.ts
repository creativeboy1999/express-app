export declare const ENV: {
    ENVIRONMENT: string;
    DB: {
        MONGODB: {
            URL: string;
            DATABASE_NAME: string;
        };
        REDIS: {
            URL: string;
            PASSWORD: string;
        };
    };
    BOT: {
        TOKEN: string;
        CHAT_ID: number;
    };
    BASE_URL: string;
    HTTP_HOST: string;
    HTTP_PORT: number;
    JWT_SECRET_ACCESS: string;
    JWT_SECRET_REFRESH: string;
    JWT_EXPIRE_ACCESS: string;
    JWT_EXPIRE_REFRESH: string;
};
