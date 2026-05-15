import { PrismaService } from '../prisma/prisma.service';
export declare class ReportesService {
    private prisma;
    constructor(prisma: PrismaService);
    getDashboardStats(): Promise<{
        totalCursos: number;
        totalEstudiantes: number;
        totalInscripciones: number;
        totalVentas: number | import("@prisma/client-runtime-utils").Decimal;
        trend: {
            month: string;
            count: number;
        }[];
        activities: {
            type: string;
            title: string;
            detail: string;
            time: Date | null;
            icon: string;
            route: string;
        }[];
        pendingInscriptions: number;
    }>;
    private getTrendData;
    private getRecentActivities;
    getEnrollmentsByCourse(): Promise<{
        _count: {
            inscripciones: number;
        };
        titulo: string;
    }[]>;
}
