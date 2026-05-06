import { PrismaService } from '../prisma/prisma.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
export declare class CursosService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateCursoDto): Promise<{
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
    }>;
    findAll(): Promise<({
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
        plantilla_certificado: {
            id: number;
            curso_id: number;
            nombre: string;
            background_url: string;
            config: import("@prisma/client/runtime/client").JsonValue;
            fecha_creacion: Date;
            fecha_actualizacion: Date;
        } | null;
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
    })[]>;
    findPublished(): Promise<({
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
    })[]>;
    findOne(id: number): Promise<{
        categoria: {
            id: number;
            nombre: string;
            fecha_creacion: Date;
            descripcion: string | null;
        };
        instructor: {
            id: number;
            fecha_creacion: Date;
            fecha_actualizacion: Date;
            correo: string;
            nombres: string;
            apellidos: string;
            contrasena_hash: string | null;
            telefono: string | null;
            rol_id: number;
            google_id: string | null;
            ci: string | null;
            imagen_perfil: string | null;
            estado: string;
            correo_verificado: boolean;
            ultimo_login: Date | null;
            refresh_token: string | null;
        };
        evaluaciones: {
            id: number;
            curso_id: number;
            fecha_creacion: Date;
            descripcion: string | null;
            titulo: string;
            nota_aprobacion: import("@prisma/client-runtime-utils").Decimal;
            tiempo_limite: number | null;
            intentos_permitidos: number;
        }[];
        modulos: ({
            lecciones: {
                id: number;
                fecha_creacion: Date;
                titulo: string;
                orden_leccion: number;
                modulo_id: number;
                tipo_contenido: string;
                video_url: string | null;
                pdf_url: string | null;
                contenido: string | null;
                duracion_minutos: number | null;
                es_preview: boolean;
            }[];
        } & {
            id: number;
            curso_id: number;
            fecha_creacion: Date;
            titulo: string;
            orden_modulo: number;
        })[];
        plantilla_certificado: {
            id: number;
            curso_id: number;
            nombre: string;
            background_url: string;
            config: import("@prisma/client/runtime/client").JsonValue;
            fecha_creacion: Date;
            fecha_actualizacion: Date;
        } | null;
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
    }>;
    update(id: number, updateDto: UpdateCursoDto): Promise<{
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
    }>;
    remove(id: number): Promise<{
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
    }>;
}
