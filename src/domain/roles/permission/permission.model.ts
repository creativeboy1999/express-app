import { index, modelOptions, prop } from '@typegoose/typegoose';
import { COLLECTIONS } from '../../../common/constant';
import { MongoBaseModel } from '../../../db/mongo/base.model';
import { Permissions } from './enum';

@modelOptions({
  schemaOptions: {
    collection: COLLECTIONS.permissions,
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  },
})
@index({ title: 1, deletedAt: 1 }, { unique: true })
export class PermissionModel extends MongoBaseModel {
  @prop({ required: true, trim: true })
  public title: Permissions;
}
