import { UploadsService } from './uploads.service';
export declare class UploadsController {
    private readonly uploadsService;
    constructor(uploadsService: UploadsService);
    uploadFile(file: Express.Multer.File): {
        message: string;
        url: string;
        mimetype: string;
        size: number;
    };
    findAll(): Promise<{
        filename: string;
        size: number;
        createdAt: Date;
        isUsed: boolean;
        usages: {
            type: string;
            name: string;
            id: number;
        }[];
        url: string;
    }[]>;
    remove(filename: string): Promise<{
        message: string;
    }>;
    removeBulk(filenames: string[]): Promise<{
        message: string;
        deletedCount: number;
        errors: string[] | undefined;
    }>;
}
