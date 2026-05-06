import { PrismaService } from '../prisma/prisma.service';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';
import { UpdateEvaluacionDto } from './dto/update-evaluacion.dto';
export declare class EvaluacionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateEvaluacionDto): Promise<{
        id: number;
        curso_id: number;
        fecha_creacion: Date;
        descripcion: string | null;
        titulo: string;
        nota_aprobacion: import("@prisma/client-runtime-utils").Decimal;
        tiempo_limite: number | null;
        intentos_permitidos: number;
    }>;
    findAll(): Promise<({
        curso: {
            titulo: string;
        };
        _count: {
            preguntas: number;
        };
    } & {
        id: number;
        curso_id: number;
        fecha_creacion: Date;
        descripcion: string | null;
        titulo: string;
        nota_aprobacion: import("@prisma/client-runtime-utils").Decimal;
        tiempo_limite: number | null;
        intentos_permitidos: number;
    })[]>;
    findOne(id: number): Promise<{
        preguntas: ({
            respuestas: {
                id: number;
                respuesta: string;
                pregunta_id: number;
                es_correcta: boolean;
            }[];
        } & {
            id: number;
            pregunta: string;
            evaluacion_id: number;
            tipo_pregunta: string;
            puntos: number;
        })[];
    } & {
        id: number;
        curso_id: number;
        fecha_creacion: Date;
        descripcion: string | null;
        titulo: string;
        nota_aprobacion: import("@prisma/client-runtime-utils").Decimal;
        tiempo_limite: number | null;
        intentos_permitidos: number;
    }>;
    update(id: number, updateDto: UpdateEvaluacionDto): Promise<{
        id: number;
        curso_id: number;
        fecha_creacion: Date;
        descripcion: string | null;
        titulo: string;
        nota_aprobacion: import("@prisma/client-runtime-utils").Decimal;
        tiempo_limite: number | null;
        intentos_permitidos: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        curso_id: number;
        fecha_creacion: Date;
        descripcion: string | null;
        titulo: string;
        nota_aprobacion: import("@prisma/client-runtime-utils").Decimal;
        tiempo_limite: number | null;
        intentos_permitidos: number;
    }>;
}
