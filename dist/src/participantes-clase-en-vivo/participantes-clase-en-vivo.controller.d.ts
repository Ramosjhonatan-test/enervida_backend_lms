import { ParticipanteClaseEnVivosService } from './participantes-clase-en-vivo.service';
import { CreateParticipanteClaseEnVivoDto } from './dto/create-participante-clase-en-vivo.dto';
import { UpdateParticipanteClaseEnVivoDto } from './dto/update-participante-clase-en-vivo.dto';
export declare class ParticipanteClaseEnVivosController {
    private readonly service;
    constructor(service: ParticipanteClaseEnVivosService);
    create(createDto: CreateParticipanteClaseEnVivoDto): Promise<{
        id: number;
        usuario_id: number;
        clase_en_vivo_id: number;
        hora_ingreso: Date;
        hora_salida: Date | null;
        minutos_asistencia: number | null;
    }>;
    findAll(): Promise<{
        id: number;
        usuario_id: number;
        clase_en_vivo_id: number;
        hora_ingreso: Date;
        hora_salida: Date | null;
        minutos_asistencia: number | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        usuario_id: number;
        clase_en_vivo_id: number;
        hora_ingreso: Date;
        hora_salida: Date | null;
        minutos_asistencia: number | null;
    }>;
    update(id: number, updateDto: UpdateParticipanteClaseEnVivoDto): Promise<{
        id: number;
        usuario_id: number;
        clase_en_vivo_id: number;
        hora_ingreso: Date;
        hora_salida: Date | null;
        minutos_asistencia: number | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        usuario_id: number;
        clase_en_vivo_id: number;
        hora_ingreso: Date;
        hora_salida: Date | null;
        minutos_asistencia: number | null;
    }>;
}
