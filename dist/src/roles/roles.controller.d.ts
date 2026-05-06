import { RolsService } from './roles.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
export declare class RolsController {
    private readonly service;
    constructor(service: RolsService);
    create(createDto: CreateRolDto): Promise<{
        id: number;
        nombre: string;
        fecha_creacion: Date;
        descripcion: string | null;
    }>;
    findAll(): Promise<{
        id: number;
        nombre: string;
        fecha_creacion: Date;
        descripcion: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        nombre: string;
        fecha_creacion: Date;
        descripcion: string | null;
    }>;
    update(id: number, updateDto: UpdateRolDto): Promise<{
        id: number;
        nombre: string;
        fecha_creacion: Date;
        descripcion: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        nombre: string;
        fecha_creacion: Date;
        descripcion: string | null;
    }>;
}
