import { mongoose, prop } from '@typegoose/typegoose';

export class MongoBaseModel {
  @prop({ _id: true })
  public _id!: mongoose.Types.ObjectId;

  @prop({ type: Date, default: new Date().toISOString() })
  public updatedAt: string;

  @prop({ type: Date })
  public createdAt: string;

  @prop({ type: mongoose.Types.ObjectId, default: null })
  public deletedBy!: string | null;

  @prop({ type: Date, default: null })
  public deletedAt: string = null;

  // @prop({ type: Date, default: null })
  // public __v: string = null;
}
