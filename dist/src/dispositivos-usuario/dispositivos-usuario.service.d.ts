import { PrismaService } from '../prisma/prisma.service';
import { CreateDispositivoUsuarioDto } from './dto/create-dispositivo-usuario.dto';
import { UpdateDispositivoUsuarioDto } from './dto/update-dispositivo-usuario.dto';
export declare class DispositivoUsuariosService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateDispositivoUsuarioDto): Promise<{
        id: number;
        fecha_creacion: Date;
        fingerprint: string | null;
        nombre_dispositivo: string | null;
        navegador: string | null;
        sistema_operativo: string | null;
        usuario_id: number;
        direccion_ip: string | null;
        user_agent: string | null;
        activo: boolean;
        ultimo_acceso: Date | null;
    }>;
    findAll(): Promise<{
        id: number;
        fecha_creacion: Date;
        fingerprint: string | null;
        nombre_dispositivo: string | null;
        navegador: string | null;
        sistema_operativo: string | null;
        usuario_id: number;
        direccion_ip: string | null;
        user_agent: string | null;
        activo: boolean;
        ultimo_acceso: Date | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        fecha_creacion: Date;
        fingerprint: string | null;
        nombre_dispositivo: string | null;
        navegador: string | null;
        sistema_operativo: string | null;
        usuario_id: number;
        direccion_ip: string | null;
        user_agent: string | null;
        activo: boolean;
        ultimo_acceso: Date | null;
    }>;
    update(id: number, updateDto: UpdateDispositivoUsuarioDto): Promise<{
        id: number;
        fecha_creacion: Date;
        fingerprint: string | null;
        nombre_dispositivo: string | null;
        navegador: string | null;
        sistema_operativo: string | null;
        usuario_id: number;
        direccion_ip: string | null;
        user_agent: string | null;
        activo: boolean;
        ultimo_acceso: Date | null;
    }>;
    deactivateAllForUser(usuarioId: number): Promise<import("@prisma/client").Prisma.BatchPayload>;
    remove(id: number): Promise<{
        id: number;
        fecha_creacion: Date;
        fingerprint: string | null;
        nombre_dispositivo: string | null;
        navegador: string | null;
        sistema_operativo: string | null;
        usuario_id: number;
        direccion_ip: string | null;
        user_agent: string | null;
        activo: boolean;
        ultimo_acceso: Date | null;
    }>;
}
