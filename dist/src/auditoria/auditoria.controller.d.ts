import { AuditoriaLogsService } from './auditoria.service';
import { CreateAuditoriaLogDto } from './dto/create-auditoria-log.dto';
import { UpdateAuditoriaLogDto } from './dto/update-auditoria-log.dto';
export declare class AuditoriaLogsController {
    private readonly service;
    constructor(service: AuditoriaLogsService);
    create(createDto: CreateAuditoriaLogDto): Promise<{
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
        fecha_creacion: Date;
        id: number;
        usuario_id: number | null;
    }>;
    findAll(): Promise<({
        usuario: {
            nombres: string;
            apellidos: string;
            correo: string;
        } | null;
    } & {
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
        fecha_creacion: Date;
        id: number;
        usuario_id: number | null;
    })[]>;
    findOne(id: number): Promise<{
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
        fecha_creacion: Date;
        id: number;
        usuario_id: number | null;
    }>;
    update(id: number, updateDto: UpdateAuditoriaLogDto): Promise<{
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
        fecha_creacion: Date;
        id: number;
        usuario_id: number | null;
    }>;
    remove(id: number): Promise<{
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
        fecha_creacion: Date;
        id: number;
        usuario_id: number | null;
    }>;
    deleteAll(): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
