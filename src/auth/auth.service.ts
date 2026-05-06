import { Injectable, UnauthorizedException, BadRequestException, InternalServerErrorException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { MailsService } from '../mails/mails.service';
import { TokensRecuperacionService } from '../tokens-recuperacion/tokens-recuperacion.service';
import { OAuth2Client } from 'google-auth-library';
import { AuditoriaLogsService } from '../auditoria/auditoria.service';
import axios from 'axios';

@Injectable()
export class AuthService {
  private googleClient = new OAuth2Client();

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailsService: MailsService,
    private tokensService: TokensRecuperacionService,
    private auditoriaService: AuditoriaLogsService,
  ) {}

  async register(createDto: RegisterDto, requestInfo?: { ip: string; userAgent: string }) {
    const { contrasena_hash, correo, fingerprint, navegador, sistema_operativo, nombre_dispositivo, ...rest } = createDto;

    const existingUser = await this.prisma.usuario.findUnique({ where: { correo } });
    if (existingUser) throw new BadRequestException('El correo ya está registrado');

    const hashed = await bcrypt.hash(contrasena_hash, 10);

    const studentRole = await this.prisma.rol.findFirst({ where: { nombre: 'estudiante' } });
    if (!studentRole) throw new BadRequestException('Rol estudiante no encontrado');
    const rolId = studentRole.id;

    const user = await this.prisma.usuario.create({
      data: {
        ...rest,
        correo,
        contrasena_hash: hashed,
        rol_id: rolId,
      },
      include: { rol: true },
    });

    // Registrar dispositivo inicial
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

  async googleLogin(
    body: { 
      token?: string, 
      access_token?: string,
      fingerprint?: string,
      navegador?: string,
      sistema_operativo?: string,
      nombre_dispositivo?: string
    }, 
    requestInfo?: { ip: string; userAgent: string }
  ) {
    let email, given_name, family_name, googleId, picture;

    try {
      if (body.access_token) {
        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${body.access_token}` },
        });
        const data = userInfo.data;
        email = data.email;
        given_name = data.given_name;
        family_name = data.family_name;
        googleId = data.sub;
        picture = data.picture;
      } else if (body.token) {
        const ticket = await this.googleClient.verifyIdToken({
          idToken: body.token,
          audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
        });
        const payload = ticket.getPayload();
        if (!payload) throw new UnauthorizedException('Token de Google inválido');
        email = payload.email;
        given_name = payload.given_name;
        family_name = payload.family_name;
        googleId = payload.sub;
        picture = payload.picture;
      } else {
        throw new BadRequestException('Se requiere token o access_token');
      }

      if (!email) throw new BadRequestException('Google no proporcionó un correo electrónico');

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
      } else {
        const studentRole = await this.prisma.rol.findFirst({ where: { nombre: { equals: 'estudiante', mode: 'insensitive' } } });
        if (!studentRole) throw new BadRequestException('Rol estudiante no configurado');
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

      // Validar bloqueo por dispositivo
      await this.validateAndRegisterDevice(user, body, requestInfo);

      await this.prisma.usuario.update({
        where: { id: user.id },
        data: { ultimo_login: new Date() },
      });

      const tokens = await this.getTokens(user.id, user.correo, user.rol_id, user.rol.nombre);
      await this.updateRefreshToken(user.id, tokens.refresh_token);
      return { ...tokens, user: this.sanitizeUser(user) };
    } catch (error) {
      if (error instanceof ForbiddenException) throw error;
      console.error('Google Auth Error:', error);
      throw new UnauthorizedException('Error al verificar token de Google');
    }
  }

  async login(loginDto: LoginDto, requestInfo?: { ip: string; userAgent: string }) {
    const { correo, contrasena, fingerprint, navegador, sistema_operativo, nombre_dispositivo } = loginDto;

    const user = await this.prisma.usuario.findUnique({ 
      where: { correo },
      include: { rol: true }
    });
    if (!user) {
      await this.logAuditoria(null, 'LOGIN_FAILED', 'usuarios', null, `Intento fallido: ${correo}`, requestInfo);
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (!user.contrasena_hash) {
      throw new UnauthorizedException('Este usuario no tiene contraseña (probablemente use login social)');
    }

    const isMatch = await bcrypt.compare(contrasena, user.contrasena_hash);
    if (!isMatch) {
      await this.logAuditoria(user.id, 'LOGIN_FAILED', 'usuarios', user.id, `Contraseña incorrecta para: ${correo}`, requestInfo);
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Bloqueo por Dispositivo (Solo para estudiantes)
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

  async logout(userId: number) {
    await this.prisma.usuario.update({
      where: { id: userId },
      data: { refresh_token: null as any },
    });
    await this.logAuditoria(userId, 'LOGOUT', 'usuarios', userId, `Cierre de sesión`);
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.prisma.usuario.findUnique({ 
      where: { id: userId },
      include: { rol: true }
    });
    if (!user || !user.refresh_token) throw new ForbiddenException('Acceso denegado');

    const refreshTokenMatches = await bcrypt.compare(refreshToken, user.refresh_token);
    if (!refreshTokenMatches) throw new ForbiddenException('Token de refresco inválido');

    const tokens = await this.getTokens(user.id, user.correo, user.rol_id, user.rol.nombre);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.prisma.usuario.update({
      where: { id: userId },
      data: { refresh_token: hashedRefreshToken },
    });
  }

  async forgotPassword(email: string) {
    try {
      const user = await this.prisma.usuario.findUnique({ where: { correo: email } });
      if (!user) {
        throw new BadRequestException('Usuario no encontrado');
      }

      const tokenRecord = await this.tokensService.createToken(user.id);
      
      try {
        await this.mailsService.sendPasswordResetEmail(user.correo, user.nombres, tokenRecord.token);
      } catch (mailError) {
        console.error('CRITICAL: Error al enviar correo de recuperación:', mailError.message);
        
        // En desarrollo, permitimos que el flujo continúe para no bloquear al usuario
        // y mostramos el token en consola para que puedan probar el reset.
        const resetUrl = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${tokenRecord.token}`;
        console.log('--- DEBUG RECOVERY LINK ---');
        console.log(resetUrl);
        console.log('---------------------------');
        
        return { 
          message: 'Solicitud procesada',
          debug_info: 'El servicio de correo falló, pero puedes usar el token en consola si estás en desarrollo.'
        };
      }

      await this.logAuditoria(user.id, 'PASSWORD_RESET_REQUEST', 'usuarios', user.id, `Solicitud de recuperación de contraseña`);
      
      return { message: 'Correo de recuperación enviado' };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException) {
        throw error;
      }
      console.error('Error en forgotPassword:', error);
      throw new InternalServerErrorException('Ocurrió un error al procesar su solicitud');
    }
  }

  async resetPassword(token: string, newPassword: string) {
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

  async verifyEmail(token: string) {
    const tokenRecord = await this.tokensService.validateToken(token);
    
    await this.prisma.usuario.update({
      where: { id: tokenRecord.usuario_id },
      data: { correo_verificado: true },
    });

    await this.tokensService.markAsUsed(tokenRecord.id);
    await this.logAuditoria(tokenRecord.usuario_id, 'EMAIL_VERIFIED', 'usuarios', tokenRecord.usuario_id, `Correo electrónico verificado`);
    return { message: 'Correo verificado exitosamente' };
  }

  async getTokens(userId: number, email: string, rolId: number, rolNombre: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email, rolId, rol: rolNombre },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION') as any,
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email, rolId, rol: rolNombre },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION') as any,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  private async validateAndRegisterDevice(user: any, deviceInfo: any, requestInfo?: { ip: string; userAgent: string }) {
    const { fingerprint, navegador, sistema_operativo, nombre_dispositivo } = deviceInfo;

    // Solo aplicamos bloqueo por dispositivo a estudiantes
    if (user.rol.nombre.toLowerCase() !== 'estudiante') return;

    const activeDevice = await this.prisma.dispositivoUsuario.findFirst({
      where: { usuario_id: user.id, activo: true }
    });

    if (activeDevice) {
      // Si hay un dispositivo activo, el fingerprint debe coincidir
      if (!fingerprint || activeDevice.fingerprint !== fingerprint) {
        await this.logAuditoria(user.id, 'DEVICE_BLOCKED', 'dispositivos_usuario', activeDevice.id, `Intento de acceso desde dispositivo no autorizado: ${navegador || 'Desconocido'} / ${sistema_operativo || 'Desconocido'}`, requestInfo);
        throw new ForbiddenException('Tu cuenta está vinculada a otro dispositivo. Contacta al administrador para liberarla.');
      }
      
      // Actualizar último acceso si coincide
      await this.prisma.dispositivoUsuario.update({
        where: { id: activeDevice.id },
        data: { 
          ultimo_acceso: new Date(),
          direccion_ip: requestInfo?.ip,
          user_agent: requestInfo?.userAgent
        }
      });
    } else if (fingerprint) {
      // Si no hay dispositivo activo y se envía un fingerprint, lo registramos como el principal
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

  private sanitizeUser(user: any) {
    const { contrasena_hash, refresh_token, ...rest } = user;
    return {
      ...rest,
      hasPassword: !!contrasena_hash
    };
  }

  private async logAuditoria(usuarioId: number | null, accion: string, entidad: string, entidadId: number | null, descripcion: string, info?: any) {
    await this.prisma.auditoriaLog.create({
      data: {
        usuario_id: usuarioId,
        accion,
        entidad,
        entidad_id: entidadId,
        descripcion,
        direccion_ip: info?.ip,
        user_agent: info?.userAgent,
      },
    });
  }
}
