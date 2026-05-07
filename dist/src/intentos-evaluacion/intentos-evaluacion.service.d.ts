import { PrismaService } from '../prisma/prisma.service';
import { CreateIntentoEvaluacionDto } from './dto/create-intento-evaluacion.dto';
import { UpdateIntentoEvaluacionDto } from './dto/update-intento-evaluacion.dto';
import { CertificadosService } from '../certificados/certificados.service';
export declare class IntentoEvaluacionsService {
    private prisma;
    private certificadosService;
    constructor(prisma: PrismaService, certificadosService: CertificadosService);
    create(createDto: CreateIntentoEvaluacionDto): Promise<{
        certificado: any;
        intentos_usados: number;
        intentos_permitidos: number;
        id: number;
        usuario_id: number;
        fecha_inicio: Date;
        evaluacion_id: number;
        nota: import("@prisma/client-runtime-utils").Decimal | null;
        fecha_fin: Date | null;
        aprobado: boolean | null;
    }>;
    findAll(): Promise<{
        id: number;
        usuario_id: number;
        fecha_inicio: Date;
        evaluacion_id: number;
        nota: import("@prisma/client-runtime-utils").Decimal | null;
        fecha_fin: Date | null;
        aprobado: boolean | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        usuario_id: number;
        fecha_inicio: Date;
        evaluacion_id: number;
        nota: import("@prisma/client-runtime-utils").Decimal | null;
        fecha_fin: Date | null;
        aprobado: boolean | null;
    }>;
    update(id: number, updateDto: UpdateIntentoEvaluacionDto): Promise<{
        id: number;
        usuario_id: number;
        fecha_inicio: Date;
        evaluacion_id: number;
        nota: import("@prisma/client-runtime-utils").Decimal | null;
        fecha_fin: Date | null;
        aprobado: boolean | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        usuario_id: number;
        fecha_inicio: Date;
        evaluacion_id: number;
        nota: import("@prisma/client-runtime-utils").Decimal | null;
        fecha_fin: Date | null;
        aprobado: boolean | null;
    }>;
}
