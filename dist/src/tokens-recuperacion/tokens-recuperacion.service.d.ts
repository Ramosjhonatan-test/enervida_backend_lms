import { PrismaService } from '../prisma/prisma.service';
export declare class TokensRecuperacionService {
    private prisma;
    constructor(prisma: PrismaService);
    createToken(usuarioId: number): Promise<{
        token: string;
        expira_en: Date;
        usado: boolean;
        fecha_creacion: Date;
        id: number;
        usuario_id: number;
    }>;
    validateToken(token: string): Promise<{
        usuario: {
            fecha_creacion: Date;
            id: number;
            rol_id: number;
            nombres: string;
            apellidos: string;
            correo: string;
            contrasena_hash: string | null;
            google_id: string | null;
            ci: string | null;
            telefono: string | null;
            imagen_perfil: string | null;
            estado: string;
            correo_verificado: boolean;
            ultimo_login: Date | null;
            fecha_actualizacion: Date;
            refresh_token: string | null;
        };
    } & {
        token: string;
        expira_en: Date;
        usado: boolean;
        fecha_creacion: Date;
        id: number;
        usuario_id: number;
    }>;
    markAsUsed(tokenId: number): Promise<void>;
}
