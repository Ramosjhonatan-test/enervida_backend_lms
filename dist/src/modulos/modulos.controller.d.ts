import { ModulosService } from './modulos.service';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
export declare class ModulosController {
    private readonly service;
    constructor(service: ModulosService);
    create(createDto: CreateModuloDto): Promise<{
        id: number;
        curso_id: number;
        fecha_creacion: Date;
        titulo: string;
        orden_modulo: number;
    }>;
    findAll(): Promise<{
        id: number;
        curso_id: number;
        fecha_creacion: Date;
        titulo: string;
        orden_modulo: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        curso_id: number;
        fecha_creacion: Date;
        titulo: string;
        orden_modulo: number;
    }>;
    update(id: number, updateDto: UpdateModuloDto): Promise<{
        id: number;
        curso_id: number;
        fecha_creacion: Date;
        titulo: string;
        orden_modulo: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        curso_id: number;
        fecha_creacion: Date;
        titulo: string;
        orden_modulo: number;
    }>;
}
