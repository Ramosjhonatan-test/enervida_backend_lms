import { LeccionsService } from './lecciones.service';
import { CreateLeccionDto } from './dto/create-leccion.dto';
import { UpdateLeccionDto } from './dto/update-leccion.dto';
export declare class LeccionsController {
    private readonly service;
    constructor(service: LeccionsService);
    create(createDto: CreateLeccionDto): Promise<{
        id: number;
        fecha_creacion: Date;
        titulo: string;
        orden_leccion: number;
        modulo_id: number;
        tipo_contenido: string;
        video_url: string | null;
        pdf_url: string | null;
        contenido: string | null;
        duracion_minutos: number | null;
        es_preview: boolean;
    }>;
    findAll(): Promise<{
        id: number;
        fecha_creacion: Date;
        titulo: string;
        orden_leccion: number;
        modulo_id: number;
        tipo_contenido: string;
        video_url: string | null;
        pdf_url: string | null;
        contenido: string | null;
        duracion_minutos: number | null;
        es_preview: boolean;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        fecha_creacion: Date;
        titulo: string;
        orden_leccion: number;
        modulo_id: number;
        tipo_contenido: string;
        video_url: string | null;
        pdf_url: string | null;
        contenido: string | null;
        duracion_minutos: number | null;
        es_preview: boolean;
    }>;
    update(id: number, updateDto: UpdateLeccionDto): Promise<{
        id: number;
        fecha_creacion: Date;
        titulo: string;
        orden_leccion: number;
        modulo_id: number;
        tipo_contenido: string;
        video_url: string | null;
        pdf_url: string | null;
        contenido: string | null;
        duracion_minutos: number | null;
        es_preview: boolean;
    }>;
    remove(id: number): Promise<{
        id: number;
        fecha_creacion: Date;
        titulo: string;
        orden_leccion: number;
        modulo_id: number;
        tipo_contenido: string;
        video_url: string | null;
        pdf_url: string | null;
        contenido: string | null;
        duracion_minutos: number | null;
        es_preview: boolean;
    }>;
}
