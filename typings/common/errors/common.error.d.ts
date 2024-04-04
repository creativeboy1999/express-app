import { ValidationError } from 'class-validator';
export declare class BaseException {
    readonly code: number;
    readonly message: string;
    readonly data: unknown;
    readonly meta: unknown;
    readonly success: boolean;
    readonly time: string;
    constructor(code: number, message: string, data: unknown, meta?: unknown, success?: boolean, time?: string);
    static Success(data: unknown, meta: unknown): BaseException;
    static UnknownError(data?: unknown, meta?: unknown): BaseException;
    static ValidationError(data?: ValidationError[] | string): BaseException;
    static AllreadyExist(data: any, message: any): BaseException;
    static InternalServerError(): BaseException;
    static NotFound(code: number, data: string): BaseException;
}
