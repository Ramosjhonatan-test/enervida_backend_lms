import { AuditoriaLogsService } from './auditoria.service';
import { CreateAuditoriaLogDto } from './dto/create-auditoria-log.dto';
import { UpdateAuditoriaLogDto } from './dto/update-auditoria-log.dto';
export declare class AuditoriaLogsController {
    private readonly service;
    constructor(service: AuditoriaLogsService);
    create(createDto: CreateAuditoriaLogDto): Promise<{
        id: number;
        fecha_creacion: Date;
        usuario_id: number | null;
        accion: string;
        entidad: string;
        entidad_id: number | null;
        descripcion: string | null;
        valores_anteriores: import("@prisma/client/runtime/client").JsonValue | null;
        valores_nuevos: import("@prisma/client/runtime/client").JsonValue | null;
        direccion_ip: string | null;
        user_agent: string | null;
        metodo_request: string | null;
        endpoint: string | null;
    }>;
    findAll(): Promise<({
        usuario: {
            nombres: string;
            apellidos: string;
            correo: string;
        } | null;
    } & {
        id: number;
        fecha_creacion: Date;
        usuario_id: number | null;
        accion: string;
        entidad: string;
        entidad_id: number | null;
        descripcion: string | null;
        valores_anteriores: import("@prisma/client/runtime/client").JsonValue | null;
        valores_nuevos: import("@prisma/client/runtime/client").JsonValue | null;
        direccion_ip: string | null;
        user_agent: string | null;
        metodo_request: string | null;
        endpoint: string | null;
    })[]>;
    findOne(id: number): Promise<{
        id: number;
        fecha_creacion: Date;
        usuario_id: number | null;
        accion: string;
        entidad: string;
        entidad_id: number | null;
        descripcion: string | null;
        valores_anteriores: import("@prisma/client/runtime/client").JsonValue | null;
        valores_nuevos: import("@prisma/client/runtime/client").JsonValue | null;
        direccion_ip: string | null;
        user_agent: string | null;
        metodo_request: string | null;
        endpoint: string | null;
    }>;
    update(id: number, updateDto: UpdateAuditoriaLogDto): Promise<{
        id: number;
        fecha_creacion: Date;
        usuario_id: number | null;
        accion: string;
        entidad: string;
        entidad_id: number | null;
        descripcion: string | null;
        valores_anteriores: import("@prisma/client/runtime/client").JsonValue | null;
        valores_nuevos: import("@prisma/client/runtime/client").JsonValue | null;
        direccion_ip: string | null;
        user_agent: string | null;
        metodo_request: string | null;
        endpoint: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        fecha_creacion: Date;
        usuario_id: number | null;
        accion: string;
        entidad: string;
        entidad_id: number | null;
        descripcion: string | null;
        valores_anteriores: import("@prisma/client/runtime/client").JsonValue | null;
        valores_nuevos: import("@prisma/client/runtime/client").JsonValue | null;
        direccion_ip: string | null;
        user_agent: string | null;
        metodo_request: string | null;
        endpoint: string | null;
    }>;
    deleteAll(): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
