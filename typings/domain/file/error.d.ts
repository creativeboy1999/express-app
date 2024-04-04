import { BaseException } from './../../common/errors/common.error';
export declare class FileException extends BaseException {
    static InvalidUploadType(data?: unknown): BaseException;
    static FileNotFound(data?: unknown): BaseException;
    static InvalidFileData(data?: unknown): BaseException;
    static InvalidFileType(data?: unknown): BaseException;
}
