import { index, modelOptions, prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { COLLECTIONS } from '../../common/constant';
import { MongoBaseModel } from '../../db/mongo/base.model';

@modelOptions({
  schemaOptions: {
    collection: COLLECTIONS.users,
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  },
})
@index({ email: 1, deletedAt: 1 }, { unique: true })
export class UserModel extends MongoBaseModel {
  @prop({ default: null, trim: true, minlength: 3 })
  public email: string;

  @prop({ default: null, trim: true })
  public password: string;

  @prop({ required: true, trim: true })
  public firstName: string;

  @prop({ default: '', trim: true })
  public lastName?: string;

  @prop({ type: Types.ObjectId, default: null })
  public roleId?: string;

  @prop({ trim: true })
  public phoneNumber?: string;

  @prop({ default: null })
  public birthday?: string;
}
