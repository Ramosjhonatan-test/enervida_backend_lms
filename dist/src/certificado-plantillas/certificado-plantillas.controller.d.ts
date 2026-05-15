import { CertificadoPlantillasService } from './certificado-plantillas.service';
import { CreateCertificadoPlantillaDto } from './dto/create-certificado-plantilla.dto';
import { UpdateCertificadoPlantillaDto } from './dto/update-certificado-plantilla.dto';
export declare class CertificadoPlantillasController {
    private readonly service;
    constructor(service: CertificadoPlantillasService);
    create(createDto: CreateCertificadoPlantillaDto): Promise<{
        id: number;
        curso_id: number;
        nombre: string;
        background_url: string;
        config: import("@prisma/client/runtime/client").JsonValue;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
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
    } & {
        id: number;
        curso_id: number;
        nombre: string;
        background_url: string;
        config: import("@prisma/client/runtime/client").JsonValue;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
    })[]>;
    findByCurso(cursoId: number): Promise<{
        id: number;
        curso_id: number;
        nombre: string;
        background_url: string;
        config: import("@prisma/client/runtime/client").JsonValue;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
    } | null>;
    findOne(id: number): Promise<{
        id: number;
        curso_id: number;
        nombre: string;
        background_url: string;
        config: import("@prisma/client/runtime/client").JsonValue;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
    }>;
    update(id: number, updateDto: UpdateCertificadoPlantillaDto): Promise<{
        id: number;
        curso_id: number;
        nombre: string;
        background_url: string;
        config: import("@prisma/client/runtime/client").JsonValue;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        curso_id: number;
        nombre: string;
        background_url: string;
        config: import("@prisma/client/runtime/client").JsonValue;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
    }>;
}
