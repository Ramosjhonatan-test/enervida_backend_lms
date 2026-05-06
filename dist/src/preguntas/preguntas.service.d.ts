import { PrismaService } from '../prisma/prisma.service';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';
export declare class PreguntasService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreatePreguntaDto): Promise<{
        id: number;
        pregunta: string;
        evaluacion_id: number;
        tipo_pregunta: string;
        puntos: number;
    }>;
    findAll(): Promise<{
        id: number;
        pregunta: string;
        evaluacion_id: number;
        tipo_pregunta: string;
        puntos: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        pregunta: string;
        evaluacion_id: number;
        tipo_pregunta: string;
        puntos: number;
    }>;
    update(id: number, updateDto: UpdatePreguntaDto): Promise<{
        id: number;
        pregunta: string;
        evaluacion_id: number;
        tipo_pregunta: string;
        puntos: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        pregunta: string;
        evaluacion_id: number;
        tipo_pregunta: string;
        puntos: number;
    }>;
}
