import { BaseDtoGroup } from '../../common/validation/dto/common.dto';
import { PagingDto } from '../../common/validation/dto/paging.dto';
export declare class LogDtoGroup extends BaseDtoGroup {
}
export declare class LogPagingDto extends PagingDto {
    byMethod: string;
}
export declare class LogDto {
    cookies: unknown;
    signedCookies: unknown;
    requestOn?: string;
    responseOn?: string;
    requestPath?: string;
    requestMethod: string;
    requestHeader?: Record<string, unknown>;
    requestQuery?: Record<string, unknown>;
    requestBody?: Record<string, unknown>;
    responseBody?: Record<string, unknown>;
    requestUser?: Record<string, unknown>;
}
