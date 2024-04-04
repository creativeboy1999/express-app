/// <reference types="mongoose/types/types" />
import { Types } from 'mongoose';
export declare class BaseDtoGroup {
    static readonly CREATE = "create";
    static readonly UPDATE = "update";
    static readonly DELETE = "delete";
    static readonly GET_BY_ID = "getById";
    static readonly PAGINATION = "pagination";
}
export declare class BaseDto {
    _id: string | Types.ObjectId;
    createdBy?: string | Types.ObjectId;
    deletedBy?: string | Types.ObjectId;
    deletedAt?: string;
    createdAt?: string;
    updatedAt?: string;
}
export declare class GetPagingDto {
}
