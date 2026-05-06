export declare class CreateDispositivoUsuarioDto {
    usuario_id: number;
    nombre_dispositivo?: string;
    sistema_operativo?: string;
    navegador?: string;
    fingerprint?: string;
    direccion_ip?: string;
    activo?: boolean;
    ultimo_acceso?: Date;
    fecha_creacion?: Date;
}
