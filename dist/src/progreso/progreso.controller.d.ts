import { ProgresoLeccionsService } from './progreso.service';
import { CreateProgresoLeccionDto } from './dto/create-progreso-leccion.dto';
import { UpdateProgresoLeccionDto } from './dto/update-progreso-leccion.dto';
export declare class ProgresoLeccionsController {
    private readonly service;
    constructor(service: ProgresoLeccionsService);
    create(createDto: CreateProgresoLeccionDto): Promise<{
        id: number;
        usuario_id: number;
        fecha_completado: Date | null;
        leccion_id: number;
        completado: boolean;
        segundos_vistos: number;
    }>;
    findAll(): Promise<{
        id: number;
        usuario_id: number;
        fecha_completado: Date | null;
        leccion_id: number;
        completado: boolean;
        segundos_vistos: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        usuario_id: number;
        fecha_completado: Date | null;
        leccion_id: number;
        completado: boolean;
        segundos_vistos: number;
    }>;
    update(id: number, updateDto: UpdateProgresoLeccionDto): Promise<{
        id: number;
        usuario_id: number;
        fecha_completado: Date | null;
        leccion_id: number;
        completado: boolean;
        segundos_vistos: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        usuario_id: number;
        fecha_completado: Date | null;
        leccion_id: number;
        completado: boolean;
        segundos_vistos: number;
    }>;
}
