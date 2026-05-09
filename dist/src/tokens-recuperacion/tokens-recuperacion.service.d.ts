import { PrismaService } from '../prisma/prisma.service';
export declare class TokensRecuperacionService {
    private prisma;
    constructor(prisma: PrismaService);
    createToken(usuarioId: number): Promise<{
        id: number;
        fecha_creacion: Date;
        token: string;
        expira_en: Date;
        usado: boolean;
        usuario_id: number;
    }>;
    validateToken(token: string): Promise<{
        usuario: {
            id: number;
            fecha_creacion: Date;
            fecha_actualizacion: Date;
            correo: string;
            nombres: string;
            apellidos: string;
            contrasena_hash: string | null;
            telefono: string | null;
            rol_id: number;
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
        token: string;
        expira_en: Date;
        usado: boolean;
        usuario_id: number;
    }>;
    markAsUsed(tokenId: number): Promise<void>;
}
