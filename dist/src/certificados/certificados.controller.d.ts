import type { Response } from 'express';
import { CertificadosService } from './certificados.service';
import { CreateCertificadoDto } from './dto/create-certificado.dto';
import { UpdateCertificadoDto } from './dto/update-certificado.dto';
export declare class CertificadosController {
    private readonly service;
    constructor(service: CertificadosService);
    findMyCertificates(userId: number): Promise<({
        curso: {
            id: number;
            fecha_creacion: Date;
            fecha_actualizacion: Date;
            descripcion: string | null;
            precio: import("@prisma/client-runtime-utils").Decimal | null;
            categoria_id: number;
            instructor_id: number;
            titulo: string;
            slug: string;
            descripcion_corta: string | null;
            miniatura_url: string | null;
            nivel: string | null;
            tipo_curso: string | null;
            certificado_habilitado: boolean;
            publicado: boolean;
        };
    } & {
        id: number;
        curso_id: number;
        usuario_id: number;
        pdf_url: string;
        codigo_certificado: string;
        fecha_emision: Date;
    })[]>;
    create(createDto: CreateCertificadoDto): Promise<{
        id: number;
        curso_id: number;
        usuario_id: number;
        pdf_url: string;
        codigo_certificado: string;
        fecha_emision: Date;
    }>;
    findAll(): Promise<({
        curso: {
            id: number;
            fecha_creacion: Date;
            fecha_actualizacion: Date;
            descripcion: string | null;
            precio: import("@prisma/client-runtime-utils").Decimal | null;
            categoria_id: number;
            instructor_id: number;
            titulo: string;
            slug: string;
            descripcion_corta: string | null;
            miniatura_url: string | null;
            nivel: string | null;
            tipo_curso: string | null;
            certificado_habilitado: boolean;
            publicado: boolean;
        };
    } & {
        id: number;
        curso_id: number;
        usuario_id: number;
        pdf_url: string;
        codigo_certificado: string;
        fecha_emision: Date;
    })[]>;
    findOne(id: number): Promise<{
        id: number;
        curso_id: number;
        usuario_id: number;
        pdf_url: string;
        codigo_certificado: string;
        fecha_emision: Date;
    }>;
    update(id: number, updateDto: UpdateCertificadoDto): Promise<{
        id: number;
        curso_id: number;
        usuario_id: number;
        pdf_url: string;
        codigo_certificado: string;
        fecha_emision: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        curso_id: number;
        usuario_id: number;
        pdf_url: string;
        codigo_certificado: string;
        fecha_emision: Date;
    }>;
    download(id: number, res: Response): Promise<void>;
    preview(plantillaId: number, res: Response): Promise<void>;
}
