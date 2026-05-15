"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = __importStar(require("bcrypt"));
const mails_service_1 = require("../mails/mails.service");
const tokens_recuperacion_service_1 = require("../tokens-recuperacion/tokens-recuperacion.service");
const google_auth_library_1 = require("google-auth-library");
const auditoria_service_1 = require("../auditoria/auditoria.service");
const axios_1 = __importDefault(require("axios"));
let AuthService = class AuthService {
    prisma;
    jwtService;
    configService;
    mailsService;
    tokensService;
    auditoriaService;
    googleClient = new google_auth_library_1.OAuth2Client();
    constructor(prisma, jwtService, configService, mailsService, tokensService, auditoriaService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
        this.mailsService = mailsService;
        this.tokensService = tokensService;
        this.auditoriaService = auditoriaService;
    }
    async register(createDto, requestInfo) {
        const { contrasena_hash, correo, fingerprint, navegador, sistema_operativo, nombre_dispositivo, ...rest } = createDto;
        const existingUser = await this.prisma.usuario.findUnique({ where: { correo } });
        if (existingUser)
            throw new common_1.BadRequestException('El correo ya está registrado');
        const hashed = await bcrypt.hash(contrasena_hash, 10);
        const studentRole = await this.prisma.rol.findFirst({
            where: { nombre: { equals: 'estudiante', mode: 'insensitive' } }
        });
        if (!studentRole)
            throw new common_1.BadRequestException('Rol estudiante no encontrado en el sistema');
        const rolId = studentRole.id;
        const user = await this.prisma.usuario.create({
            data: {
                ...rest,
                correo,
                contrasena_hash: hashed,
                rol_id: rolId,
                estado: 'ACTIVO',
            },
            include: { rol: true },
        });
        if (fingerprint) {
            await this.prisma.dispositivoUsuario.create({
                data: {
                    usuario_id: user.id,
                    fingerprint,
                    navegador,
                    sistema_operativo,
                    nombre_dispositivo: nombre_dispositivo || `${navegador} en ${sistema_operativo}`,
                    direccion_ip: requestInfo?.ip,
                    user_agent: requestInfo?.userAgent,
                    activo: true,
                    ultimo_acceso: new Date(),
                }
            });
        }
        await this.logAuditoria(user.id, 'REGISTER_SUCCESS', 'usuarios', user.id, `Usuario registrado y dispositivo vinculado`, requestInfo);
        const tokens = await this.getTokens(user.id, user.correo, user.rol_id, user.rol.nombre);
        await this.updateRefreshToken(user.id, tokens.refresh_token);
        return { ...tokens, user: this.sanitizeUser(user) };
    }
    async googleLogin(body, requestInfo) {
        let email, given_name, family_name, googleId, picture;
        try {
            if (body.access_token) {
                const userInfo = await axios_1.default.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${body.access_token}` },
                });
                const data = userInfo.data;
                email = data.email;
                given_name = data.given_name;
                family_name = data.family_name;
                googleId = data.sub;
                picture = data.picture;
            }
            else if (body.token) {
                const ticket = await this.googleClient.verifyIdToken({
                    idToken: body.token,
                    audience: this.configService.get('GOOGLE_CLIENT_ID'),
                });
                const payload = ticket.getPayload();
                if (!payload)
                    throw new common_1.UnauthorizedException('Token de Google inválido');
                email = payload.email;
                given_name = payload.given_name;
                family_name = payload.family_name;
                googleId = payload.sub;
                picture = payload.picture;
            }
            else {
                throw new common_1.BadRequestException('Se requiere token o access_token');
            }
            if (!email)
                throw new common_1.BadRequestException('Google no proporcionó un correo electrónico');
            let user = await this.prisma.usuario.findFirst({
                where: { OR: [{ google_id: googleId }, { correo: email }] },
                include: { rol: true },
            });
            if (user) {
                if (!user.google_id) {
                    user = await this.prisma.usuario.update({
                        where: { id: user.id },
                        data: { google_id: googleId, imagen_perfil: user.imagen_perfil || picture },
                        include: { rol: true },
                    });
                }
            }
            else {
                const studentRole = await this.prisma.rol.findFirst({ where: { nombre: { equals: 'estudiante', mode: 'insensitive' } } });
                if (!studentRole)
                    throw new common_1.BadRequestException('Rol estudiante no configurado');
                user = await this.prisma.usuario.create({
                    data: {
                        correo: email,
                        nombres: given_name || 'Usuario',
                        apellidos: family_name || 'Google',
                        google_id: googleId,
                        imagen_perfil: picture,
                        rol_id: studentRole.id,
                        estado: 'ACTIVO',
                        correo_verificado: true,
                    },
                    include: { rol: true },
                });
            }
            await this.validateAndRegisterDevice(user, body, requestInfo);
            await this.prisma.usuario.update({
                where: { id: user.id },
                data: { ultimo_login: new Date() },
            });
            const tokens = await this.getTokens(user.id, user.correo, user.rol_id, user.rol.nombre);
            await this.updateRefreshToken(user.id, tokens.refresh_token);
            return { ...tokens, user: this.sanitizeUser(user) };
        }
        catch (error) {
            if (error instanceof common_1.ForbiddenException)
                throw error;
            console.error('Google Auth Error:', error);
            throw new common_1.UnauthorizedException('Error al verificar token de Google');
        }
    }
    async login(loginDto, requestInfo) {
        const { correo, contrasena, fingerprint, navegador, sistema_operativo, nombre_dispositivo } = loginDto;
        const failedCount = await this.getFailedAttempts(correo);
        const user = await this.prisma.usuario.findUnique({
            where: { correo },
            include: { rol: true }
        });
        if (!user) {
            await this.logAuditoria(null, 'LOGIN_FAILED', 'usuarios', null, `Intento fallido: Correo inexistente ${correo}`, requestInfo, { correo });
            if (failedCount + 1 >= 3) {
                throw new common_1.ForbiddenException('Se han detectado demasiados intentos fallidos desde este correo. Por seguridad, el acceso ha sido restringido temporalmente.');
            }
            const remaining = 3 - (failedCount + 1);
            throw new common_1.UnauthorizedException(`Credenciales inválidas. Te ${remaining === 1 ? 'queda' : 'quedan'} ${remaining} ${remaining === 1 ? 'intento' : 'intentos'} antes de restringir el acceso.`);
        }
        if (user.estado === 'BLOQUEADO') {
            await this.logAuditoria(user.id, 'LOGIN_BLOCKED', 'usuarios', user.id, `Intento de acceso a cuenta bloqueada: ${correo}`, requestInfo, { correo });
            throw new common_1.ForbiddenException('Tu cuenta ha sido bloqueada por seguridad tras múltiples intentos fallidos. Contacta al administrador para desbloquearla.');
        }
        if (!user.contrasena_hash) {
            throw new common_1.UnauthorizedException('Este usuario no tiene contraseña (probablemente use login social)');
        }
        const isMatch = await bcrypt.compare(contrasena, user.contrasena_hash);
        if (!isMatch) {
            await this.logAuditoria(user.id, 'LOGIN_FAILED', 'usuarios', user.id, `Contraseña incorrecta para: ${correo}`, requestInfo, { correo });
            const currentCount = failedCount + 1;
            if (currentCount >= 3) {
                await this.prisma.usuario.update({
                    where: { id: user.id },
                    data: { estado: 'BLOQUEADO' }
                });
                try {
                    await this.mailsService.sendAccountBlockedEmail(user.correo, user.nombres);
                }
                catch (mailError) {
                    console.error('Error al enviar correo de bloqueo:', mailError.message);
                }
                await this.logAuditoria(user.id, 'ACCOUNT_BLOCKED', 'usuarios', user.id, `Cuenta bloqueada automáticamente tras ${currentCount} intentos fallidos`, requestInfo, { correo });
                throw new common_1.ForbiddenException('Tu cuenta ha sido bloqueada tras 3 intentos fallidos. Por seguridad, hemos enviado un correo de aviso. Contacta al administrador para restaurar el acceso.');
            }
            const remaining = 3 - currentCount;
            throw new common_1.UnauthorizedException(`Credenciales inválidas. Te ${remaining === 1 ? 'queda' : 'quedan'} ${remaining} ${remaining === 1 ? 'intento' : 'intentos'} antes de bloquear tu cuenta.`);
        }
        await this.validateAndRegisterDevice(user, { fingerprint, navegador, sistema_operativo, nombre_dispositivo }, requestInfo);
        await this.logAuditoria(user.id, 'LOGIN_SUCCESS', 'usuarios', user.id, `Inicio de sesión exitoso`, requestInfo);
        await this.prisma.usuario.update({
            where: { id: user.id },
            data: { ultimo_login: new Date() },
        });
        const tokens = await this.getTokens(user.id, user.correo, user.rol_id, user.rol.nombre);
        await this.updateRefreshToken(user.id, tokens.refresh_token);
        return { ...tokens, user: this.sanitizeUser(user) };
    }
    async logout(userId) {
        await this.prisma.usuario.update({
            where: { id: userId },
            data: { refresh_token: null },
        });
        await this.logAuditoria(userId, 'LOGOUT', 'usuarios', userId, `Cierre de sesión`);
    }
    async refreshTokens(userId, refreshToken) {
        const user = await this.prisma.usuario.findUnique({
            where: { id: userId },
            include: { rol: true }
        });
        if (!user || !user.refresh_token)
            throw new common_1.ForbiddenException('Acceso denegado');
        const refreshTokenMatches = await bcrypt.compare(refreshToken, user.refresh_token);
        if (!refreshTokenMatches)
            throw new common_1.ForbiddenException('Token de refresco inválido');
        const tokens = await this.getTokens(user.id, user.correo, user.rol_id, user.rol.nombre);
        await this.updateRefreshToken(user.id, tokens.refresh_token);
        return tokens;
    }
    async updateRefreshToken(userId, refreshToken) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.prisma.usuario.update({
            where: { id: userId },
            data: { refresh_token: hashedRefreshToken },
        });
    }
    async forgotPassword(email) {
        try {
            const user = await this.prisma.usuario.findUnique({ where: { correo: email } });
            if (!user) {
                throw new common_1.BadRequestException('Usuario no encontrado');
            }
            const tokenRecord = await this.tokensService.createToken(user.id);
            try {
                await this.mailsService.sendPasswordResetEmail(user.correo, user.nombres, tokenRecord.token);
                console.log(`Correo de recuperación enviado exitosamente a: ${user.correo}`);
            }
            catch (mailError) {
                console.error('CRITICAL: Error al enviar correo de recuperación:', mailError.message);
            }
            await this.logAuditoria(user.id, 'PASSWORD_RESET_REQUEST', 'usuarios', user.id, `Solicitud de recuperación de contraseña`);
            return {
                message: 'Si el correo existe en nuestro sistema, recibirás un enlace de recuperación en breve.',
                success: true
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException || error instanceof common_1.InternalServerErrorException) {
                throw error;
            }
            console.error('Error en forgotPassword:', error);
            throw new common_1.InternalServerErrorException('Ocurrió un error al procesar su solicitud');
        }
    }
    async resetPassword(token, newPassword) {
        const tokenRecord = await this.tokensService.validateToken(token);
        const hashed = await bcrypt.hash(newPassword, 10);
        await this.prisma.usuario.update({
            where: { id: tokenRecord.usuario_id },
            data: { contrasena_hash: hashed },
        });
        await this.tokensService.markAsUsed(tokenRecord.id);
        await this.logAuditoria(tokenRecord.usuario_id, 'PASSWORD_RESET_SUCCESS', 'usuarios', tokenRecord.usuario_id, `Contraseña restablecida exitosamente`);
        return { message: 'Contraseña actualizada correctamente' };
    }
    async verifyEmail(token) {
        const tokenRecord = await this.tokensService.validateToken(token);
        await this.prisma.usuario.update({
            where: { id: tokenRecord.usuario_id },
            data: { correo_verificado: true },
        });
        await this.tokensService.markAsUsed(tokenRecord.id);
        await this.logAuditoria(tokenRecord.usuario_id, 'EMAIL_VERIFIED', 'usuarios', tokenRecord.usuario_id, `Correo electrónico verificado`);
        return { message: 'Correo verificado exitosamente' };
    }
    async getTokens(userId, email, rolId, rolNombre) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({ sub: userId, email, rolId, rol: rolNombre }, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION'),
            }),
            this.jwtService.signAsync({ sub: userId, email, rolId, rol: rolNombre }, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION'),
            }),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }
    async validateAndRegisterDevice(user, deviceInfo, requestInfo) {
        const { fingerprint, navegador, sistema_operativo, nombre_dispositivo } = deviceInfo;
        if (user.rol.nombre.toLowerCase() !== 'estudiante')
            return;
        const activeDevice = await this.prisma.dispositivoUsuario.findFirst({
            where: { usuario_id: user.id, activo: true }
        });
        if (activeDevice) {
            if (!fingerprint || activeDevice.fingerprint !== fingerprint) {
                await this.logAuditoria(user.id, 'DEVICE_BLOCKED', 'dispositivos_usuario', activeDevice.id, `Intento de acceso desde dispositivo no autorizado: ${navegador || 'Desconocido'} / ${sistema_operativo || 'Desconocido'}`, requestInfo);
                throw new common_1.ForbiddenException('Tu cuenta está vinculada a otro dispositivo. Contacta al administrador para liberarla.');
            }
            await this.prisma.dispositivoUsuario.update({
                where: { id: activeDevice.id },
                data: {
                    ultimo_acceso: new Date(),
                    direccion_ip: requestInfo?.ip,
                    user_agent: requestInfo?.userAgent
                }
            });
        }
        else if (fingerprint) {
            await this.prisma.dispositivoUsuario.create({
                data: {
                    usuario_id: user.id,
                    fingerprint,
                    navegador: navegador || 'Navegador Web',
                    sistema_operativo: sistema_operativo || 'OS',
                    nombre_dispositivo: nombre_dispositivo || `${navegador || 'Navegador'} en ${sistema_operativo || 'OS'}`,
                    direccion_ip: requestInfo?.ip,
                    user_agent: requestInfo?.userAgent,
                    activo: true,
                    ultimo_acceso: new Date(),
                }
            });
        }
    }
    sanitizeUser(user) {
        const { contrasena_hash, refresh_token, ...rest } = user;
        return {
            ...rest,
            hasPassword: !!contrasena_hash
        };
    }
    async getFailedAttempts(correo) {
        const cutoff = new Date(Date.now() - 30 * 60 * 1000);
        const lastSuccess = await this.prisma.auditoriaLog.findFirst({
            where: {
                accion: 'LOGIN_SUCCESS',
                usuario: { correo }
            },
            orderBy: { fecha_creacion: 'desc' }
        });
        const startTime = (lastSuccess && lastSuccess.fecha_creacion > cutoff)
            ? lastSuccess.fecha_creacion
            : cutoff;
        return await this.prisma.auditoriaLog.count({
            where: {
                accion: 'LOGIN_FAILED',
                fecha_creacion: { gt: startTime },
                OR: [
                    { usuario: { correo } },
                    { valores_nuevos: { path: ['correo'], equals: correo } }
                ]
            }
        });
    }
    async logAuditoria(usuarioId, accion, entidad, entidadId, descripcion, info, valores_nuevos) {
        await this.auditoriaService.log({
            usuario_id: usuarioId || undefined,
            accion,
            entidad,
            entidad_id: entidadId || undefined,
            descripcion,
            direccion_ip: info?.ip,
            user_agent: info?.userAgent,
            metodo_request: 'POST',
            endpoint: '/auth/login',
            valores_nuevos,
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService,
        mails_service_1.MailsService,
        tokens_recuperacion_service_1.TokensRecuperacionService,
        auditoria_service_1.AuditoriaLogsService])
], AuthService);
//# sourceMappingURL=auth.service.js.map