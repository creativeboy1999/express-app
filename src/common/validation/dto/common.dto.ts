import { IsMongoId, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class BaseDtoGroup {
  static readonly CREATE = 'create';
  static readonly UPDATE = 'update';
  static readonly DELETE = 'delete';
  static readonly GET_BY_ID = 'getById';
  static readonly PAGINATION = 'pagination';
}

export class BaseDto {
  @IsOptional({ groups: [BaseDtoGroup.PAGINATION] })
  @IsMongoId({
    groups: [
      BaseDtoGroup.UPDATE,
      BaseDtoGroup.DELETE,
      BaseDtoGroup.GET_BY_ID,
      BaseDtoGroup.PAGINATION,
    ],
  })
  _id: string | Types.ObjectId;

  @IsOptional({ groups: [BaseDtoGroup.CREATE] })
  @IsMongoId({ groups: [BaseDtoGroup.CREATE] })
  createdBy?: string | Types.ObjectId;

  @IsOptional({ groups: [BaseDtoGroup.DELETE] })
  @IsMongoId({ groups: [BaseDtoGroup.DELETE] })
  deletedBy?: string | Types.ObjectId;

  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export class GetPagingDto {}
