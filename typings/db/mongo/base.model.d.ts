/// <reference types="mongoose/types/types" />
import { mongoose } from '@typegoose/typegoose';
export declare class MongoBaseModel {
    _id: mongoose.Types.ObjectId;
    updatedAt: string;
    createdAt: string;
    deletedBy: string | null;
    deletedAt: string;
}
