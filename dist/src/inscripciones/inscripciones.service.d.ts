import { PrismaService } from '../prisma/prisma.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';
export declare class InscripcionsService {
    private prisma;
    constructor(prisma: PrismaService);
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
            precio: import("@prisma/client-runtime-utils").Decimal | null;
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
        };
        usuario: {
            id: number;
            correo: string;
            nombres: string;
            apellidos: string;
            telefono: string | null;
            ci: string | null;
            imagen_perfil: string | null;
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
    findByUser(usuarioId: number): Promise<({
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
            precio: import("@prisma/client-runtime-utils").Decimal | null;
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
