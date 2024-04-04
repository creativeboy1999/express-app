import { mongoose } from '@typegoose/typegoose';
import { isMongoId } from 'class-validator';
import { MongoBaseModel } from './base.model';
import { IMongoBaseRepository } from './base.repository.interface';

export type ModelType<TModel extends MongoBaseModel> = mongoose.Model<TModel>;

export abstract class MongoBaseRepository<TModel extends MongoBaseModel>
  implements IMongoBaseRepository<TModel>
{
  protected readonly model: ModelType<TModel>;

  constructor(model: ModelType<TModel>) {
    this.model = model;
  }

  newObjectId(): mongoose.Types.ObjectId {
    return new mongoose.Types.ObjectId();
  }

  toObjectId(id: string | mongoose.Types.ObjectId): mongoose.Types.ObjectId {
    return new mongoose.Types.ObjectId(id);
  }

  getModel(): ModelType<TModel> {
    return this.model;
  }

  private static get defaultOptions(): mongoose.QueryOptions {
    return { lean: true };
  }

  private static getQueryOptions(options?: mongoose.QueryOptions): mongoose.QueryOptions {
    const mergedOptions = {
      ...MongoBaseRepository.defaultOptions,
      ...(options || {}),
    };

    return mergedOptions;
  }

  createModel(doc?: Partial<TModel>): mongoose.HydratedDocument<TModel> {
    return new this.model(doc);
  }

  async create(doc: Partial<TModel>): Promise<TModel> {
    if (!isMongoId(doc._id)) {
      doc._id = this.newObjectId();
    }

    return await (await this.model.create(doc)).toObject({});
  }

  async insertMany(docs: TModel[]) {
    docs = docs.map((doc) => {
      if (!isMongoId(doc._id)) {
        doc._id = this.newObjectId();
      }

      return doc;
    });

    return await this.model.insertMany(docs);
  }

  countOfQuerySearch(
    query: mongoose.FilterQuery<TModel> = {},
  ): mongoose.QueryWithHelpers<number, TModel> {
    return this.model.countDocuments(query);
  }

  async countAsync(filter: mongoose.FilterQuery<TModel>): Promise<number> {
    if (filter.deletedAt == undefined) {
      filter.deletedAt = null;
    }

    return await this.countOfQuerySearch(filter);
  }

  async findById(
    id: string | mongoose.Types.ObjectId,
    projection?: mongoose.ProjectionType<TModel> | null,
    options?: mongoose.QueryOptions,
  ): Promise<TModel | null> {
    id = this.toObjectId(id);

    return await this.model
      .findOne(
        {
          _id: id as mongoose.Types.ObjectId,
          deletedAt: null,
        } as mongoose.FilterQuery<TModel>,
        projection,
      )
      .setOptions(MongoBaseRepository.getQueryOptions(options))
      .lean();
  }

  async findOne(
    filter: mongoose.FilterQuery<TModel>,
    projection?: mongoose.ProjectionType<TModel> | null,
    options: mongoose.QueryOptions = { lean: true },
  ): Promise<TModel | null> {
    if (filter.deletedAt == undefined) {
      filter.deletedAt = null;
    }

    return await this.model
      .findOne(filter, projection)
      .setOptions(MongoBaseRepository.getQueryOptions(options));
  }

  async findByIdAndUpdate(
    data: { _id: string | mongoose.Types.ObjectId } & mongoose.UpdateQuery<TModel>,
    options: mongoose.QueryOptions = {},
  ): Promise<TModel | null> {
    const { _id, ...fields } = data;

    return await this.model
      .findOneAndUpdate(
        { _id: this.toObjectId(_id), deletedAt: null } as mongoose.FilterQuery<TModel>,
        {
          $set: fields as mongoose.UpdateQuery<TModel>,
        },
      )
      .setOptions(MongoBaseRepository.getQueryOptions(options));
  }

  async findOneAndUpdate(
    query: mongoose.FilterQuery<TModel>,
    data: mongoose.UpdateQuery<TModel>,
    options: mongoose.QueryOptions<TModel> = { lean: true },
  ): Promise<TModel> {
    return await this.model.findOneAndUpdate(query, data, options).lean();
  }

  async findPaging(
    filter: mongoose.FilterQuery<TModel>,
    sort: Partial<Record<keyof TModel, 1 | -1 | mongoose.Expression.Meta>>,
    limit = 10,
    page = 1,
    projection?: mongoose.ProjectionType<TModel> | null,
    options: mongoose.QueryOptions = { lean: true },
  ): Promise<TModel[]> {
    return await this.model
      .find({ ...filter, deletedAt: null }, projection)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .setOptions(MongoBaseRepository.getQueryOptions(options));
  }

  async deleteOne(
    filter: mongoose.FilterQuery<TModel>,
    deletedBy: string,
    options?: mongoose.QueryOptions,
  ) {
    return await this.model
      .findOneAndUpdate(
        { ...filter, deletedAt: null },
        { $set: { deletedAt: new Date().toISOString(), deletedBy: deletedBy } },
      )
      .limit(1)
      .setOptions(MongoBaseRepository.getQueryOptions(options))
      .lean();
  }

  async deleteMany(
    filter: mongoose.FilterQuery<TModel>,
    deletedBy: string,
    options?: mongoose.QueryOptions,
  ) {
    return await this.model
      .updateMany(
        { ...filter, deletedAt: null },
        { $set: { deletedAt: new Date().toISOString(), deletedBy: deletedBy } },
      )
      .setOptions(MongoBaseRepository.getQueryOptions(options))
      .lean();
  }

  async findByIdAndDeleteResult(id: string | mongoose.Types.ObjectId) {
    return await this.model.findByIdAndDelete(this.toObjectId(id), { lean: true });
  }
}
