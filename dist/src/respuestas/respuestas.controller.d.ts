import { RespuestasService } from './respuestas.service';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { UpdateRespuestaDto } from './dto/update-respuesta.dto';
export declare class RespuestasController {
    private readonly service;
    constructor(service: RespuestasService);
    create(createDto: CreateRespuestaDto): Promise<{
        id: number;
        respuesta: string;
        pregunta_id: number;
        es_correcta: boolean;
    }>;
    findAll(): Promise<{
        id: number;
        respuesta: string;
        pregunta_id: number;
        es_correcta: boolean;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        respuesta: string;
        pregunta_id: number;
        es_correcta: boolean;
    }>;
    update(id: number, updateDto: UpdateRespuestaDto): Promise<{
        id: number;
        respuesta: string;
        pregunta_id: number;
        es_correcta: boolean;
    }>;
    remove(id: number): Promise<{
        id: number;
        respuesta: string;
        pregunta_id: number;
        es_correcta: boolean;
    }>;
}
