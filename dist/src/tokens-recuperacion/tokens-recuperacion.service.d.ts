import { PrismaService } from '../prisma/prisma.service';
export declare class TokensRecuperacionService {
    private prisma;
    constructor(prisma: PrismaService);
    createToken(usuarioId: number): Promise<{
        id: number;
        fecha_creacion: Date;
        usuario_id: number;
        token: string;
        expira_en: Date;
        usado: boolean;
    }>;
    validateToken(token: string): Promise<{
        usuario: {
            id: number;
            fecha_creacion: Date;
            fecha_actualizacion: Date;
            rol_id: number;
            nombres: string;
            apellidos: string;
            correo: string;
            contrasena_hash: string | null;
            telefono: string | null;
            imagen_perfil: string | null;
            estado: string;
            correo_verificado: boolean;
            ultimo_login: Date | null;
            refresh_token: string | null;
            ci: string | null;
            google_id: string | null;
        };
    } & {
        id: number;
        fecha_creacion: Date;
        usuario_id: number;
        token: string;
        expira_en: Date;
        usado: boolean;
    }>;
    markAsUsed(tokenId: number): Promise<void>;
}
