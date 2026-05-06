import { PrismaService } from '../prisma/prisma.service';
export declare class ReportesService {
    private prisma;
    constructor(prisma: PrismaService);
    getDashboardStats(): Promise<{
        totalCursos: number;
        totalEstudiantes: number;
        totalInscripciones: number;
        totalVentas: number | import("@prisma/client-runtime-utils").Decimal;
    }>;
    getEnrollmentsByCourse(): Promise<{
        _count: {
            inscripciones: number;
        };
        titulo: string;
    }[]>;
}
