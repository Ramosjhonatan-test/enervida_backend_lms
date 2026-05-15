import { InscripcionsService } from './inscripciones.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';
export declare class InscripcionsController {
    private readonly service;
    constructor(service: InscripcionsService);
    findMyInscripciones(userId: number): Promise<({
        curso: {
            categoria: {
                id: number;
                nombre: string;
                fecha_creacion: Date;
                descripcion: string | null;
            };
            instructor: {
                nombres: string;
                apellidos: string;
            };
        } & {
            id: number;
            fecha_creacion: Date;
            fecha_actualizacion: Date;
            descripcion: string | null;
            categoria_id: number;
            instructor_id: number;
            titulo: string;
            slug: string;
            descripcion_corta: string | null;
            miniatura_url: string | null;
            nivel: string | null;
            tipo_curso: string | null;
            certificado_habilitado: boolean;
            publicado: boolean;
            precio: import("@prisma/client-runtime-utils").Decimal | null;
        };
    } & {
        id: number;
        curso_id: number;
        usuario_id: number;
        estado: string;
        porcentaje_progreso: import("@prisma/client-runtime-utils").Decimal;
        fecha_inscripcion: Date;
        fecha_completado: Date | null;
    })[]>;
    create(userId: number, createDto: CreateInscripcionDto): Promise<{
        id: number;
        curso_id: number;
        usuario_id: number;
        estado: string;
        porcentaje_progreso: import("@prisma/client-runtime-utils").Decimal;
        fecha_inscripcion: Date;
        fecha_completado: Date | null;
    }>;
    findAll(): Promise<({
        curso: {
            id: number;
            fecha_creacion: Date;
            fecha_actualizacion: Date;
            descripcion: string | null;
            categoria_id: number;
            instructor_id: number;
            titulo: string;
            slug: string;
            descripcion_corta: string | null;
            miniatura_url: string | null;
            nivel: string | null;
            tipo_curso: string | null;
            certificado_habilitado: boolean;
            publicado: boolean;
            precio: import("@prisma/client-runtime-utils").Decimal | null;
        };
        usuario: {
            id: number;
            nombres: string;
            apellidos: string;
            correo: string;
            telefono: string | null;
            imagen_perfil: string | null;
            ci: string | null;
        };
    } & {
        id: number;
        curso_id: number;
        usuario_id: number;
        estado: string;
        porcentaje_progreso: import("@prisma/client-runtime-utils").Decimal;
        fecha_inscripcion: Date;
        fecha_completado: Date | null;
    })[]>;
    findOne(id: number): Promise<{
        id: number;
        curso_id: number;
        usuario_id: number;
        estado: string;
        porcentaje_progreso: import("@prisma/client-runtime-utils").Decimal;
        fecha_inscripcion: Date;
        fecha_completado: Date | null;
    }>;
    update(id: number, updateDto: UpdateInscripcionDto): Promise<{
        id: number;
        curso_id: number;
        usuario_id: number;
        estado: string;
        porcentaje_progreso: import("@prisma/client-runtime-utils").Decimal;
        fecha_inscripcion: Date;
        fecha_completado: Date | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        curso_id: number;
        usuario_id: number;
        estado: string;
        porcentaje_progreso: import("@prisma/client-runtime-utils").Decimal;
        fecha_inscripcion: Date;
        fecha_completado: Date | null;
    }>;
}
