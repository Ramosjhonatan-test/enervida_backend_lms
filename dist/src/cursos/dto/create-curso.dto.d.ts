export declare class CreateCursoDto {
    categoria_id: number;
    instructor_id: number;
    titulo: string;
    slug: string;
    descripcion_corta?: string;
    descripcion?: string;
    miniatura_url?: string;
    nivel?: string;
    tipo_curso?: string;
    certificado_habilitado?: boolean;
    publicado?: boolean;
    precio?: number;
    fecha_creacion?: Date;
}
