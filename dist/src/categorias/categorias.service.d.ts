import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
export declare class CategoriasService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateCategoriaDto): Promise<{
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
    update(id: number, updateDto: UpdateCategoriaDto): Promise<{
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
