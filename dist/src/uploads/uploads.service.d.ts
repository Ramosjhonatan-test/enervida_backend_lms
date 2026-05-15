import { PrismaService } from '../prisma/prisma.service';
export declare class UploadsService {
    private prisma;
    private readonly uploadsDir;
    constructor(prisma: PrismaService);
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
    checkUsage(filename: string): Promise<{
        type: string;
        name: string;
        id: number;
    }[]>;
    deleteFile(filename: string): Promise<{
        message: string;
    }>;
    deleteBulk(filenames: string[]): Promise<{
        message: string;
        deletedCount: number;
        errors: string[] | undefined;
    }>;
}
