import { IntentoEvaluacionsService } from './intentos-evaluacion.service';
import { CreateIntentoEvaluacionDto } from './dto/create-intento-evaluacion.dto';
import { UpdateIntentoEvaluacionDto } from './dto/update-intento-evaluacion.dto';
export declare class IntentoEvaluacionsController {
    private readonly service;
    constructor(service: IntentoEvaluacionsService);
    create(createDto: CreateIntentoEvaluacionDto, userId: number): Promise<{
        certificado: any;
        intentos_usados: number;
        intentos_permitidos: number;
        id: number;
        usuario_id: number;
        fecha_inicio: Date;
        fecha_fin: Date | null;
        evaluacion_id: number;
        nota: import("@prisma/client-runtime-utils").Decimal | null;
        aprobado: boolean | null;
    }>;
    findAll(): Promise<{
        id: number;
        usuario_id: number;
        fecha_inicio: Date;
        fecha_fin: Date | null;
        evaluacion_id: number;
        nota: import("@prisma/client-runtime-utils").Decimal | null;
        aprobado: boolean | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        usuario_id: number;
        fecha_inicio: Date;
        fecha_fin: Date | null;
        evaluacion_id: number;
        nota: import("@prisma/client-runtime-utils").Decimal | null;
        aprobado: boolean | null;
    }>;
    update(id: number, updateDto: UpdateIntentoEvaluacionDto): Promise<{
        id: number;
        usuario_id: number;
        fecha_inicio: Date;
        fecha_fin: Date | null;
        evaluacion_id: number;
        nota: import("@prisma/client-runtime-utils").Decimal | null;
        aprobado: boolean | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        usuario_id: number;
        fecha_inicio: Date;
        fecha_fin: Date | null;
        evaluacion_id: number;
        nota: import("@prisma/client-runtime-utils").Decimal | null;
        aprobado: boolean | null;
    }>;
}
