import { PreguntasService } from './preguntas.service';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';
export declare class PreguntasController {
    private readonly service;
    constructor(service: PreguntasService);
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
