export declare class CreateUsuarioDto {
    rol_id?: number;
    nombres: string;
    apellidos: string;
    correo: string;
    contrasena?: string;
    telefono?: string;
    ci?: string;
    imagen_perfil?: string;
    estado?: string;
    correo_verificado?: boolean;
    ultimo_login?: Date;
    fecha_creacion?: Date;
}
