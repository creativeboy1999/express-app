/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/expressions" />
import { mongoose } from '@typegoose/typegoose';
import { MongoBaseModel } from './base.model';
import { ModelType } from './base.repository';
export interface IMongoBaseRepository<TModel extends MongoBaseModel> {
    getModel(): ModelType<TModel>;
    newObjectId(): mongoose.Types.ObjectId;
    toObjectId(id: string | mongoose.Types.ObjectId): mongoose.Types.ObjectId;
    createModel(doc?: Partial<TModel>): mongoose.HydratedDocument<TModel>;
    create(doc: Partial<TModel>): Promise<TModel>;
    insertMany(docs: TModel[]): any;
    countOfQuerySearch(query?: mongoose.FilterQuery<TModel>): mongoose.QueryWithHelpers<number, TModel>;
    countAsync(filter: mongoose.FilterQuery<TModel>): Promise<number>;
    findById(id: string | mongoose.Types.ObjectId, projection?: mongoose.ProjectionType<TModel> | null, options?: mongoose.QueryOptions): Promise<TModel | null>;
    findOne(filter: mongoose.FilterQuery<TModel>, projection?: mongoose.ProjectionType<TModel> | null, options?: mongoose.QueryOptions): Promise<TModel | null>;
    findByIdAndUpdate(data: {
        _id: string | mongoose.Types.ObjectId;
    } & mongoose.UpdateQuery<TModel>, options?: mongoose.QueryOptions): Promise<TModel | null>;
    findOneAndUpdate(query: mongoose.FilterQuery<TModel>, data: mongoose.UpdateQuery<TModel>, options?: mongoose.QueryOptions<TModel>): Promise<TModel>;
    findPaging(filter: mongoose.FilterQuery<TModel>, sort: Partial<Record<keyof TModel, 1 | -1 | mongoose.Expression.Meta>>, limit?: number, page?: number, projection?: mongoose.ProjectionType<TModel> | null, options?: mongoose.QueryOptions): Promise<TModel[]>;
    deleteOne(filter: mongoose.FilterQuery<TModel>, deletedBy: string, options?: mongoose.QueryOptions): any;
    deleteMany(filter: mongoose.FilterQuery<TModel>, deletedBy: string, options?: mongoose.QueryOptions): any;
    findByIdAndDeleteResult(id: string | mongoose.Types.ObjectId): any;
}
