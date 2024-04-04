/// <reference types="node" />
import { FileBucketTypes } from './typings';
export declare class FileService {
    private readonly minio;
    constructor();
    getBucketList(): Promise<import("minio").BucketItemFromList[]>;
    private checkBucket;
    upload(file: Express.Multer.File, bucketName: FileBucketTypes, contentType: string): Promise<{
        fileName: string;
        fileUrl: string;
    } | null>;
    uploadPdfBuff(filename: string, buff: Buffer, bucketName?: FileBucketTypes): Promise<{
        fileName: string;
        fileUrl: string;
    } | null>;
    getById(id: string, bucketName: string): Promise<Buffer>;
}
export declare const fileService: FileService;
