import { Expose, Transform } from 'class-transformer';
import { IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseDtoGroup } from './common.dto';

export enum QuerySortTypeEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type QuerySortType = 'ASC' | 'DESC';

export class PagingDto<T = any> {
  @IsOptional({ groups: [BaseDtoGroup.PAGINATION] })
  @IsMongoId({ groups: [BaseDtoGroup.PAGINATION] })
  id: string;

  @Transform(({ value }) => Number(value))
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: 0,
    },
    {
      groups: [BaseDtoGroup.PAGINATION],
    },
  )
  limit = 100;

  @Transform(({ value }) => Number(value))
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: 0,
    },
    {
      groups: [BaseDtoGroup.PAGINATION],
    },
  )
  page = 1;

  @Expose({ toClassOnly: true })
  @Transform(({ value }) => value?.trim() || '')
  @IsOptional({
    groups: [BaseDtoGroup.PAGINATION],
  })
  @IsString({
    groups: [BaseDtoGroup.PAGINATION],
  })
  search?: string;

  @IsOptional({ groups: [BaseDtoGroup.PAGINATION] })
  @IsString({ groups: [BaseDtoGroup.PAGINATION] })
  orderBy?: keyof T;

  @IsOptional({ groups: [BaseDtoGroup.PAGINATION] })
  @IsEnum(QuerySortTypeEnum, { groups: [BaseDtoGroup.PAGINATION] })
  orderType?: QuerySortType = 'ASC';

  @IsOptional({ groups: [BaseDtoGroup.PAGINATION] })
  @IsMongoId({ groups: [BaseDtoGroup.PAGINATION] })
  createdBy: string;
}
