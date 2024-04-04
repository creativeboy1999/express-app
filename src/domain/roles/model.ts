import { Severity, index, modelOptions, prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { RolePermissionDto } from './dto/role-permission.dto';
import { COLLECTIONS } from '../../common/constant';
import { MongoBaseModel } from '../../db/mongo/base.model';

export class RolePermissionModel {
  @prop({ required: true })
  public title: string;

  @prop({ type: Types.ObjectId, required: true })
  public permissionId: string;

  @prop({ required: true, defaultValue: false })
  public can: boolean;
}

@modelOptions({
  schemaOptions: {
    collection: COLLECTIONS.roles,
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  },
})
@index({ title: 1 }, { unique: true })
@index({ deletedAt: 1 })
export class RoleModel extends MongoBaseModel {
  @prop({ required: true })
  public title: string;

  @prop({ required: true, default: false })
  public isEditable: boolean;

  @prop({ allowMixed: Severity.ALLOW, type: () => [RolePermissionModel] })
  public permissions: RolePermissionDto[];
}
