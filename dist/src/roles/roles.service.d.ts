import { PrismaService } from '../prisma/prisma.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
export declare class RolsService {
    private prisma;
    constructor(prisma: PrismaService);
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
