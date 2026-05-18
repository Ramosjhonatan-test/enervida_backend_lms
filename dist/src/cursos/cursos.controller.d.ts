import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
export declare class CursosController {
    private readonly service;
    constructor(service: CursosService);
    create(createDto: CreateCursoDto): Promise<{
        titulo: string;
        slug: string;
        descripcion_corta: string | null;
        descripcion: string | null;
        miniatura_url: string | null;
        nivel: string | null;
        tipo_curso: string | null;
        certificado_habilitado: boolean;
        publicado: boolean;
        precio: import("@prisma/client-runtime-utils").Decimal | null;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
        id: number;
        categoria_id: number;
        instructor_id: number;
    }>;
    findPublished(): Promise<({
        categoria: {
            descripcion: string | null;
            fecha_creacion: Date;
            id: number;
            nombre: string;
        };
        instructor: {
            nombres: string;
            apellidos: string;
        };
        modulos: {
            titulo: string;
            fecha_creacion: Date;
            id: number;
            curso_id: number;
            orden_modulo: number;
        }[];
    } & {
        titulo: string;
        slug: string;
        descripcion_corta: string | null;
        descripcion: string | null;
        miniatura_url: string | null;
        nivel: string | null;
        tipo_curso: string | null;
        certificado_habilitado: boolean;
        publicado: boolean;
        precio: import("@prisma/client-runtime-utils").Decimal | null;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
        id: number;
        categoria_id: number;
        instructor_id: number;
    })[]>;
    findAll(): Promise<({
        plantilla_certificado: {
            fecha_creacion: Date;
            fecha_actualizacion: Date;
            id: number;
            curso_id: number;
            nombre: string;
            background_url: string;
            config: import("@prisma/client/runtime/client").JsonValue;
        } | null;
        categoria: {
            descripcion: string | null;
            fecha_creacion: Date;
            id: number;
            nombre: string;
        };
        instructor: {
            nombres: string;
            apellidos: string;
        };
    } & {
        titulo: string;
        slug: string;
        descripcion_corta: string | null;
        descripcion: string | null;
        miniatura_url: string | null;
        nivel: string | null;
        tipo_curso: string | null;
        certificado_habilitado: boolean;
        publicado: boolean;
        precio: import("@prisma/client-runtime-utils").Decimal | null;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
        id: number;
        categoria_id: number;
        instructor_id: number;
    })[]>;
    findOne(id: number): Promise<{
        plantilla_certificado: {
            fecha_creacion: Date;
            fecha_actualizacion: Date;
            id: number;
            curso_id: number;
            nombre: string;
            background_url: string;
            config: import("@prisma/client/runtime/client").JsonValue;
        } | null;
        categoria: {
            descripcion: string | null;
            fecha_creacion: Date;
            id: number;
            nombre: string;
        };
        instructor: {
            fecha_creacion: Date;
            fecha_actualizacion: Date;
            id: number;
            rol_id: number;
            nombres: string;
            apellidos: string;
            correo: string;
            contrasena_hash: string | null;
            telefono: string | null;
            imagen_perfil: string | null;
            estado: string;
            correo_verificado: boolean;
            ultimo_login: Date | null;
            refresh_token: string | null;
            ci: string | null;
            google_id: string | null;
        };
        evaluaciones: {
            titulo: string;
            descripcion: string | null;
            fecha_creacion: Date;
            id: number;
            curso_id: number;
            nota_aprobacion: import("@prisma/client-runtime-utils").Decimal;
            tiempo_limite: number | null;
            intentos_permitidos: number;
        }[];
        modulos: ({
            lecciones: {
                titulo: string;
                fecha_creacion: Date;
                id: number;
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
            titulo: string;
            fecha_creacion: Date;
            id: number;
            curso_id: number;
            orden_modulo: number;
        })[];
    } & {
        titulo: string;
        slug: string;
        descripcion_corta: string | null;
        descripcion: string | null;
        miniatura_url: string | null;
        nivel: string | null;
        tipo_curso: string | null;
        certificado_habilitado: boolean;
        publicado: boolean;
        precio: import("@prisma/client-runtime-utils").Decimal | null;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
        id: number;
        categoria_id: number;
        instructor_id: number;
    }>;
    update(id: number, updateDto: UpdateCursoDto): Promise<{
        titulo: string;
        slug: string;
        descripcion_corta: string | null;
        descripcion: string | null;
        miniatura_url: string | null;
        nivel: string | null;
        tipo_curso: string | null;
        certificado_habilitado: boolean;
        publicado: boolean;
        precio: import("@prisma/client-runtime-utils").Decimal | null;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
        id: number;
        categoria_id: number;
        instructor_id: number;
    }>;
    remove(id: number): Promise<{
        titulo: string;
        slug: string;
        descripcion_corta: string | null;
        descripcion: string | null;
        miniatura_url: string | null;
        nivel: string | null;
        tipo_curso: string | null;
        certificado_habilitado: boolean;
        publicado: boolean;
        precio: import("@prisma/client-runtime-utils").Decimal | null;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
        id: number;
        categoria_id: number;
        instructor_id: number;
    }>;
}
