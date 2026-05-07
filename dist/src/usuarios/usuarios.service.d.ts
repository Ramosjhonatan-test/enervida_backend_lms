import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuariosService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateUsuarioDto): Promise<{
        nombres: string;
        apellidos: string;
        correo: string;
        contrasena_hash: string | null;
        google_id: string | null;
        ci: string | null;
        telefono: string | null;
        imagen_perfil: string | null;
        estado: string;
        correo_verificado: boolean;
        ultimo_login: Date | null;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
        refresh_token: string | null;
        id: number;
        rol_id: number;
    }>;
    findAll(): Promise<({
        rol: {
            fecha_creacion: Date;
            id: number;
            nombre: string;
            descripcion: string | null;
        };
    } & {
        nombres: string;
        apellidos: string;
        correo: string;
        contrasena_hash: string | null;
        google_id: string | null;
        ci: string | null;
        telefono: string | null;
        imagen_perfil: string | null;
        estado: string;
        correo_verificado: boolean;
        ultimo_login: Date | null;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
        refresh_token: string | null;
        id: number;
        rol_id: number;
    })[]>;
    findByRole(roleName: string): Promise<({
        inscripciones: {
            estado: string;
            id: number;
            usuario_id: number;
            curso_id: number;
            porcentaje_progreso: import("@prisma/client-runtime-utils").Decimal;
            fecha_inscripcion: Date;
            fecha_completado: Date | null;
        }[];
        rol: {
            fecha_creacion: Date;
            id: number;
            nombre: string;
            descripcion: string | null;
        };
    } & {
        nombres: string;
        apellidos: string;
        correo: string;
        contrasena_hash: string | null;
        google_id: string | null;
        ci: string | null;
        telefono: string | null;
        imagen_perfil: string | null;
        estado: string;
        correo_verificado: boolean;
        ultimo_login: Date | null;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
        refresh_token: string | null;
        id: number;
        rol_id: number;
    })[]>;
    findOne(id: number): Promise<{
        auditoria_logs: {
            fecha_creacion: Date;
            id: number;
            descripcion: string | null;
            usuario_id: number | null;
            accion: string;
            entidad: string;
            entidad_id: number | null;
            valores_anteriores: import("@prisma/client/runtime/client").JsonValue | null;
            valores_nuevos: import("@prisma/client/runtime/client").JsonValue | null;
            direccion_ip: string | null;
            user_agent: string | null;
            metodo_request: string | null;
            endpoint: string | null;
        }[];
        dispositivos: {
            fecha_creacion: Date;
            id: number;
            usuario_id: number;
            activo: boolean;
            direccion_ip: string | null;
            user_agent: string | null;
            nombre_dispositivo: string | null;
            sistema_operativo: string | null;
            navegador: string | null;
            fingerprint: string | null;
            ultimo_acceso: Date | null;
        }[];
        inscripciones: ({
            curso: {
                titulo: string;
                miniatura_url: string | null;
                categoria: {
                    nombre: string;
                };
            };
        } & {
            estado: string;
            id: number;
            usuario_id: number;
            curso_id: number;
            porcentaje_progreso: import("@prisma/client-runtime-utils").Decimal;
            fecha_inscripcion: Date;
            fecha_completado: Date | null;
        })[];
        intentos_evaluacion: ({
            evaluacion: {
                titulo: string;
                nota_aprobacion: import("@prisma/client-runtime-utils").Decimal;
            };
        } & {
            id: number;
            usuario_id: number;
            fecha_inicio: Date;
            evaluacion_id: number;
            nota: import("@prisma/client-runtime-utils").Decimal | null;
            fecha_fin: Date | null;
            aprobado: boolean | null;
        })[];
        rol: {
            fecha_creacion: Date;
            id: number;
            nombre: string;
            descripcion: string | null;
        };
    } & {
        nombres: string;
        apellidos: string;
        correo: string;
        contrasena_hash: string | null;
        google_id: string | null;
        ci: string | null;
        telefono: string | null;
        imagen_perfil: string | null;
        estado: string;
        correo_verificado: boolean;
        ultimo_login: Date | null;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
        refresh_token: string | null;
        id: number;
        rol_id: number;
    }>;
    update(id: number, updateDto: UpdateUsuarioDto): Promise<{
        nombres: string;
        apellidos: string;
        correo: string;
        contrasena_hash: string | null;
        google_id: string | null;
        ci: string | null;
        telefono: string | null;
        imagen_perfil: string | null;
        estado: string;
        correo_verificado: boolean;
        ultimo_login: Date | null;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
        refresh_token: string | null;
        id: number;
        rol_id: number;
    }>;
    remove(id: number): Promise<{
        nombres: string;
        apellidos: string;
        correo: string;
        contrasena_hash: string | null;
        google_id: string | null;
        ci: string | null;
        telefono: string | null;
        imagen_perfil: string | null;
        estado: string;
        correo_verificado: boolean;
        ultimo_login: Date | null;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
        refresh_token: string | null;
        id: number;
        rol_id: number;
    }>;
}
