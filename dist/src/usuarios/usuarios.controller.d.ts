import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuariosController {
    private readonly service;
    constructor(service: UsuariosService);
    updateProfile(userId: any, updateDto: UpdateUsuarioDto): Promise<{
        id: number;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
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
    }>;
    getProfile(userId: any): Promise<{
        rol: {
            id: number;
            nombre: string;
            fecha_creacion: Date;
            descripcion: string | null;
        };
        auditoria_logs: {
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
        }[];
        dispositivos: {
            id: number;
            fecha_creacion: Date;
            usuario_id: number;
            direccion_ip: string | null;
            user_agent: string | null;
            fingerprint: string | null;
            nombre_dispositivo: string | null;
            navegador: string | null;
            sistema_operativo: string | null;
            activo: boolean;
            ultimo_acceso: Date | null;
        }[];
        inscripciones: ({
            curso: {
                categoria: {
                    nombre: string;
                };
                titulo: string;
                miniatura_url: string | null;
            };
        } & {
            id: number;
            curso_id: number;
            usuario_id: number;
            estado: string;
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
            evaluacion_id: number;
            nota: import("@prisma/client-runtime-utils").Decimal | null;
            fecha_inicio: Date;
            fecha_fin: Date | null;
            aprobado: boolean | null;
        })[];
    } & {
        id: number;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
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
    }>;
    create(createDto: CreateUsuarioDto): Promise<{
        id: number;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
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
    }>;
    findByRole(nombre: string): Promise<({
        rol: {
            id: number;
            nombre: string;
            fecha_creacion: Date;
            descripcion: string | null;
        };
        inscripciones: {
            id: number;
            curso_id: number;
            usuario_id: number;
            estado: string;
            porcentaje_progreso: import("@prisma/client-runtime-utils").Decimal;
            fecha_inscripcion: Date;
            fecha_completado: Date | null;
        }[];
    } & {
        id: number;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
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
    })[]>;
    findAll(): Promise<({
        rol: {
            id: number;
            nombre: string;
            fecha_creacion: Date;
            descripcion: string | null;
        };
    } & {
        id: number;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
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
    })[]>;
    findOne(id: number): Promise<{
        rol: {
            id: number;
            nombre: string;
            fecha_creacion: Date;
            descripcion: string | null;
        };
        auditoria_logs: {
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
        }[];
        dispositivos: {
            id: number;
            fecha_creacion: Date;
            usuario_id: number;
            direccion_ip: string | null;
            user_agent: string | null;
            fingerprint: string | null;
            nombre_dispositivo: string | null;
            navegador: string | null;
            sistema_operativo: string | null;
            activo: boolean;
            ultimo_acceso: Date | null;
        }[];
        inscripciones: ({
            curso: {
                categoria: {
                    nombre: string;
                };
                titulo: string;
                miniatura_url: string | null;
            };
        } & {
            id: number;
            curso_id: number;
            usuario_id: number;
            estado: string;
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
            evaluacion_id: number;
            nota: import("@prisma/client-runtime-utils").Decimal | null;
            fecha_inicio: Date;
            fecha_fin: Date | null;
            aprobado: boolean | null;
        })[];
    } & {
        id: number;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
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
    }>;
    update(id: number, updateDto: UpdateUsuarioDto): Promise<{
        id: number;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
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
    }>;
    remove(id: number): Promise<{
        id: number;
        fecha_creacion: Date;
        fecha_actualizacion: Date;
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
    }>;
}
