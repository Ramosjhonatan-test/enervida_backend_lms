import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { MailsService } from '../mails/mails.service';
import { TokensRecuperacionService } from '../tokens-recuperacion/tokens-recuperacion.service';
import { AuditoriaLogsService } from '../auditoria/auditoria.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    private configService;
    private mailsService;
    private tokensService;
    private auditoriaService;
    private googleClient;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService, mailsService: MailsService, tokensService: TokensRecuperacionService, auditoriaService: AuditoriaLogsService);
    register(createDto: RegisterDto, requestInfo?: {
        ip: string;
        userAgent: string;
    }): Promise<{
        user: any;
        access_token: string;
        refresh_token: string;
    }>;
    googleLogin(body: {
        token?: string;
        access_token?: string;
        fingerprint?: string;
        navegador?: string;
        sistema_operativo?: string;
        nombre_dispositivo?: string;
    }, requestInfo?: {
        ip: string;
        userAgent: string;
    }): Promise<{
        user: any;
        access_token: string;
        refresh_token: string;
    }>;
    login(loginDto: LoginDto, requestInfo?: {
        ip: string;
        userAgent: string;
    }): Promise<{
        user: any;
        access_token: string;
        refresh_token: string;
    }>;
    logout(userId: number): Promise<void>;
    refreshTokens(userId: number, refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    updateRefreshToken(userId: number, refreshToken: string): Promise<void>;
    forgotPassword(email: string): Promise<{
        message: string;
        debug_info: string;
    } | {
        message: string;
        debug_info?: undefined;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    getTokens(userId: number, email: string, rolId: number, rolNombre: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    private validateAndRegisterDevice;
    private sanitizeUser;
    private logAuditoria;
}
