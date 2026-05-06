import { ReportesService } from './reportes.service';
export declare class ReportesController {
    private readonly service;
    constructor(service: ReportesService);
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
