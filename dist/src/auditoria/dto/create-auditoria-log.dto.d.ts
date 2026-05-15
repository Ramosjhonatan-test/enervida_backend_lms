export declare class CreateAuditoriaLogDto {
    usuario_id?: number;
    accion: string;
    entidad: string;
    entidad_id?: number;
    descripcion?: string;
    valores_anteriores?: any;
    valores_nuevos?: any;
    direccion_ip?: string;
    user_agent?: string;
    metodo_request?: string;
    endpoint?: string;
    fecha_creacion?: Date;
}
