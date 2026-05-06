import { ClaseEnVivosService } from './clases-en-vivo.service';
import { CreateClaseEnVivoDto } from './dto/create-clase-en-vivo.dto';
import { UpdateClaseEnVivoDto } from './dto/update-clase-en-vivo.dto';
export declare class ClaseEnVivosController {
    private readonly service;
    constructor(service: ClaseEnVivosService);
    create(createDto: CreateClaseEnVivoDto): Promise<{
        id: number;
        curso_id: number;
        fecha_creacion: Date;
        descripcion: string | null;
        titulo: string;
        fecha_inicio: Date;
        sala_jitsi: string;
        fecha_fin: Date | null;
        creado_por: number;
    }>;
    findAll(): Promise<{
        id: number;
        curso_id: number;
        fecha_creacion: Date;
        descripcion: string | null;
        titulo: string;
        fecha_inicio: Date;
        sala_jitsi: string;
        fecha_fin: Date | null;
        creado_por: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        curso_id: number;
        fecha_creacion: Date;
        descripcion: string | null;
        titulo: string;
        fecha_inicio: Date;
        sala_jitsi: string;
        fecha_fin: Date | null;
        creado_por: number;
    }>;
    update(id: number, updateDto: UpdateClaseEnVivoDto): Promise<{
        id: number;
        curso_id: number;
        fecha_creacion: Date;
        descripcion: string | null;
        titulo: string;
        fecha_inicio: Date;
        sala_jitsi: string;
        fecha_fin: Date | null;
        creado_por: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        curso_id: number;
        fecha_creacion: Date;
        descripcion: string | null;
        titulo: string;
        fecha_inicio: Date;
        sala_jitsi: string;
        fecha_fin: Date | null;
        creado_por: number;
    }>;
}
