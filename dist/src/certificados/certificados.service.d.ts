import { PrismaService } from '../prisma/prisma.service';
import { CreateCertificadoDto } from './dto/create-certificado.dto';
import { UpdateCertificadoDto } from './dto/update-certificado.dto';
export declare class CertificadosService {
    private prisma;
    private fontCache;
    constructor(prisma: PrismaService);
    create(createDto: CreateCertificadoDto): Promise<{
        id: number;
        curso_id: number;
        usuario_id: number;
        pdf_url: string;
        codigo_certificado: string;
        fecha_emision: Date;
    }>;
    issueCertificate(usuarioIdRaw: any, cursoIdRaw: any): Promise<{
        id: number;
        curso_id: number;
        usuario_id: number;
        pdf_url: string;
        codigo_certificado: string;
        fecha_emision: Date;
    } | null>;
    findAll(): Promise<({
        curso: {
            id: number;
            fecha_creacion: Date;
            fecha_actualizacion: Date;
            descripcion: string | null;
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
            precio: import("@prisma/client-runtime-utils").Decimal | null;
        };
    } & {
        id: number;
        curso_id: number;
        usuario_id: number;
        pdf_url: string;
        codigo_certificado: string;
        fecha_emision: Date;
    })[]>;
    findByUserId(userId: number): Promise<({
        curso: {
            id: number;
            fecha_creacion: Date;
            fecha_actualizacion: Date;
            descripcion: string | null;
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
            precio: import("@prisma/client-runtime-utils").Decimal | null;
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
    generatePdf(id: number): Promise<Buffer>;
    generatePreview(plantillaId: number): Promise<Buffer>;
    private renderCertificate;
    private getFileBuffer;
    private drawElementText;
    private drawElementImage;
    private drawElementQR;
    private loadFont;
    private fetchGoogleFont;
    private hexToRgb;
}
