/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/expressions" />
import { mongoose } from '@typegoose/typegoose';
import { MongoBaseModel } from './base.model';
import { IMongoBaseRepository } from './base.repository.interface';
export type ModelType<TModel extends MongoBaseModel> = mongoose.Model<TModel>;
export declare abstract class MongoBaseRepository<TModel extends MongoBaseModel> implements IMongoBaseRepository<TModel> {
    protected readonly model: ModelType<TModel>;
    constructor(model: ModelType<TModel>);
    newObjectId(): mongoose.Types.ObjectId;
    toObjectId(id: string | mongoose.Types.ObjectId): mongoose.Types.ObjectId;
    getModel(): ModelType<TModel>;
    private static get defaultOptions();
    private static getQueryOptions;
    createModel(doc?: Partial<TModel>): mongoose.HydratedDocument<TModel>;
    create(doc: Partial<TModel>): Promise<TModel>;
    insertMany(docs: TModel[]): Promise<mongoose.IfAny<TModel, any, mongoose.Document<unknown, {}, TModel> & mongoose.Require_id<TModel>>[]>;
    countOfQuerySearch(query?: mongoose.FilterQuery<TModel>): mongoose.QueryWithHelpers<number, TModel>;
    countAsync(filter: mongoose.FilterQuery<TModel>): Promise<number>;
    findById(id: string | mongoose.Types.ObjectId, projection?: mongoose.ProjectionType<TModel> | null, options?: mongoose.QueryOptions): Promise<TModel | null>;
    findOne(filter: mongoose.FilterQuery<TModel>, projection?: mongoose.ProjectionType<TModel> | null, options?: mongoose.QueryOptions): Promise<TModel | null>;
    findByIdAndUpdate(data: {
        _id: string | mongoose.Types.ObjectId;
    } & mongoose.UpdateQuery<TModel>, options?: mongoose.QueryOptions): Promise<TModel | null>;
    findOneAndUpdate(query: mongoose.FilterQuery<TModel>, data: mongoose.UpdateQuery<TModel>, options?: mongoose.QueryOptions<TModel>): Promise<TModel>;
    findPaging(filter: mongoose.FilterQuery<TModel>, sort: Partial<Record<keyof TModel, 1 | -1 | mongoose.Expression.Meta>>, limit?: number, page?: number, projection?: mongoose.ProjectionType<TModel> | null, options?: mongoose.QueryOptions): Promise<TModel[]>;
    deleteOne(filter: mongoose.FilterQuery<TModel>, deletedBy: string, options?: mongoose.QueryOptions): Promise<mongoose.IfAny<TModel, any, mongoose.Document<unknown, {}, TModel> & mongoose.Require_id<TModel>> extends infer T ? T extends mongoose.IfAny<TModel, any, mongoose.Document<unknown, {}, TModel> & mongoose.Require_id<TModel>> ? T extends null ? mongoose.IfAny<TModel, any, mongoose.Document<unknown, {}, TModel> & mongoose.Require_id<TModel>> extends infer T_1 ? T_1 extends mongoose.IfAny<TModel, any, mongoose.Document<unknown, {}, TModel> & mongoose.Require_id<TModel>> ? T_1 extends any[] ? mongoose.Require_id<mongoose.FlattenMaps<TModel>>[] : mongoose.Require_id<mongoose.FlattenMaps<TModel>> : never : never : mongoose.IfAny<TModel, any, mongoose.Document<unknown, {}, TModel> & mongoose.Require_id<TModel>> extends infer T_1 ? T_1 extends mongoose.IfAny<TModel, any, mongoose.Document<unknown, {}, TModel> & mongoose.Require_id<TModel>> ? T_1 extends any[] ? mongoose.Require_id<mongoose.FlattenMaps<TModel>>[] : mongoose.Require_id<mongoose.FlattenMaps<TModel>> : never : never : never : never>;
    deleteMany(filter: mongoose.FilterQuery<TModel>, deletedBy: string, options?: mongoose.QueryOptions): Promise<mongoose.UpdateWriteOpResult>;
    findByIdAndDeleteResult(id: string | mongoose.Types.ObjectId): Promise<TModel extends any[] ? mongoose.Require_id<mongoose.FlattenMaps<TModel>>[] : mongoose.Require_id<mongoose.FlattenMaps<TModel>>>;
}
