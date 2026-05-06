import { NotificacionsService } from './notificaciones.service';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { UpdateNotificacionDto } from './dto/update-notificacion.dto';
export declare class NotificacionsController {
    private readonly service;
    constructor(service: NotificacionsService);
    create(createDto: CreateNotificacionDto): Promise<{
        id: number;
        fecha_creacion: Date;
        usuario_id: number;
        titulo: string;
        mensaje: string;
        leido: boolean;
    }>;
    findAll(): Promise<{
        id: number;
        fecha_creacion: Date;
        usuario_id: number;
        titulo: string;
        mensaje: string;
        leido: boolean;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        fecha_creacion: Date;
        usuario_id: number;
        titulo: string;
        mensaje: string;
        leido: boolean;
    }>;
    update(id: number, updateDto: UpdateNotificacionDto): Promise<{
        id: number;
        fecha_creacion: Date;
        usuario_id: number;
        titulo: string;
        mensaje: string;
        leido: boolean;
    }>;
    remove(id: number): Promise<{
        id: number;
        fecha_creacion: Date;
        usuario_id: number;
        titulo: string;
        mensaje: string;
        leido: boolean;
    }>;
}
