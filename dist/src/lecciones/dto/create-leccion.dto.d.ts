export declare class CreateLeccionDto {
    modulo_id: number;
    titulo: string;
    orden_leccion: number;
    tipo_contenido: string;
    video_url?: string;
    pdf_url?: string;
    contenido?: string;
    duracion_minutos?: number;
    es_preview?: boolean;
    fecha_creacion?: Date;
}
