import { Severity, index, modelOptions, prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { COLLECTIONS } from '../../common/constant';
import { MongoBaseModel } from '../../db/mongo/base.model';

@modelOptions({
  schemaOptions: {
    collection: COLLECTIONS.logs,
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  },
})
@index({ title: 1 }, { unique: true })
@index({ deletedAt: 1 })
export class LogModel extends MongoBaseModel {
  @prop({ allowMixed: Severity.ALLOW, type: () => mongoose.Schema.Types.Mixed })
  cookies: unknown;

  @prop({ allowMixed: Severity.ALLOW, type: () => mongoose.Schema.Types.Mixed })
  signedCookies: unknown;

  @prop({ type: mongoose.Schema.Types.Date })
  requestOn?: string;

  @prop({ type: mongoose.Schema.Types.Date })
  responseOn?: string;

  @prop()
  requestPath: string;

  @prop()
  requestMethod: string;

  @prop({ allowMixed: Severity.ALLOW, type: () => mongoose.Schema.Types.Mixed })
  requestHeader: Record<string, unknown>;

  @prop({ allowMixed: Severity.ALLOW, type: () => mongoose.Schema.Types.Mixed })
  requestQuery: Record<string, unknown>;

  @prop({ allowMixed: Severity.ALLOW, type: () => mongoose.Schema.Types.Mixed })
  requestBody: Record<string, unknown>;

  @prop({ allowMixed: Severity.ALLOW, type: () => mongoose.Schema.Types.Mixed })
  responseBody: Record<string, unknown>;

  @prop({ allowMixed: Severity.ALLOW, type: () => mongoose.Schema.Types.Mixed })
  requestUser: Record<string, unknown>;
}
