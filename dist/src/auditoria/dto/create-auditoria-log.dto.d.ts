export declare class CreateAuditoriaLogDto {
    usuario_id?: number;
    accion: string;
    entidad: string;
    entidad_id?: number;
    descripcion?: string;
    valores_anteriores?: string;
    valores_nuevos?: string;
    direccion_ip?: string;
    user_agent?: string;
    metodo_request?: string;
    endpoint?: string;
    fecha_creacion?: Date;
}
