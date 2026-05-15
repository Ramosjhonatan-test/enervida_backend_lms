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
exports.MailsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = __importStar(require("nodemailer"));
const dns_1 = __importDefault(require("dns"));
let MailsService = class MailsService {
    configService;
    transporter;
    constructor(configService) {
        this.configService = configService;
        const port = this.configService.get('SMTP_PORT');
        dns_1.default.setDefaultResultOrder('ipv4first');
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('SMTP_HOST'),
            port: Number(this.configService.get('SMTP_PORT')),
            secure: Number(this.configService.get('SMTP_PORT')) === 465,
            auth: {
                user: this.configService.get('SMTP_USER'),
                pass: this.configService.get('SMTP_PASS'),
            },
            pool: false,
            connectionTimeout: 20000,
            greetingTimeout: 20000,
            socketTimeout: 20000,
            dnsTimeout: 10000,
            tls: {
                rejectUnauthorized: false,
                minVersion: 'TLSv1.2'
            }
        });
    }
    async sendMail(to, subject, html) {
        const fromEmail = this.configService.get('SMTP_USER') || '';
        try {
            await this.transporter.sendMail({
                from: {
                    name: 'Enervida LMS',
                    address: fromEmail,
                },
                to,
                subject,
                html,
            });
        }
        catch (error) {
            console.error('Error enviando correo:', error.message);
            throw error;
        }
    }
    async sendVerificationEmail(email, name, token) {
        const baseUrl = (this.configService.get('FRONTEND_URL') || '').replace(/\/$/, '');
        const url = `${baseUrl}/verify-email?token=${token}`;
        const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #007bff;">¡Bienvenido a Enervida LMS, ${name}!</h2>
        <p>Gracias por registrarte. Para completar tu registro, por favor verifica tu correo electrónico haciendo clic en el siguiente botón:</p>
        <a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">Verificar Correo</a>
        <p style="margin-top: 20px; font-size: 0.9em; color: #666;">Si no creaste esta cuenta, puedes ignorar este correo.</p>
      </div>
    `;
        await this.sendMail(email, 'Verifica tu cuenta - Enervida LMS', html);
    }
    async sendPasswordResetEmail(email, name, token) {
        const baseUrl = (this.configService.get('FRONTEND_URL') || '').replace(/\/$/, '');
        const url = `${baseUrl}/reset-password?token=${token}`;
        const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #dc3545;">Recuperación de Contraseña</h2>
        <p>Hola ${name},</p>
        <p>Has solicitado restablecer tu contraseña. Haz clic en el botón de abajo para continuar:</p>
        <a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #dc3545; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">Restablecer Contraseña</a>
        <p style="margin-top: 20px; font-size: 0.9em; color: #666;">Este enlace expirará en 1 hora. Si no solicitaste esto, puedes ignorar este correo.</p>
      </div>
    `;
        await this.sendMail(email, 'Recuperación de contraseña - Enervida LMS', html);
    }
    async sendAccountBlockedEmail(email, name) {
        const html = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 40px; background-color: #ffffff; border-radius: 16px; border: 1px solid #f1f5f9; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="display: inline-block; padding: 16px; background-color: #fee2e2; border-radius: 50%; margin-bottom: 16px;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <h2 style="color: #1e293b; margin: 0; font-size: 24px; font-weight: 800;">Cuenta Bloqueada por Seguridad</h2>
        </div>
        
        <p style="color: #475569; font-size: 16px; line-height: 1.6;">Hola <strong>${name}</strong>,</p>
        
        <p style="color: #475569; font-size: 16px; line-height: 1.6;">Detectamos múltiples intentos fallidos de inicio de sesión en tu cuenta. Por motivos de seguridad, hemos <strong>bloqueado el acceso temporalmente</strong>.</p>
        
        <div style="background-color: #f8fafc; border-left: 4px solid #ef4444; padding: 20px; margin: 24px 0; border-radius: 4px;">
          <p style="color: #1e293b; font-size: 14px; margin: 0; font-weight: 600;">¿Qué significa esto?</p>
          <p style="color: #64748b; font-size: 14px; margin: 8px 0 0;">Nadie puede entrar a tu cuenta en este momento, incluso con la contraseña correcta, hasta que un administrador revise el caso.</p>
        </div>
        
        <p style="color: #475569; font-size: 16px; line-height: 1.6;">Si no fuiste tú quien intentó acceder, es posible que alguien conozca tu correo. Te recomendamos contactar a soporte para restaurar tu acceso.</p>
        
        <div style="text-align: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid #f1f5f9;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">Este es un mensaje automático de <strong>Enervida LMS</strong>.</p>
        </div>
      </div>
    `;
        await this.sendMail(email, 'URGENTE: Tu cuenta ha sido bloqueada - Enervida LMS', html);
    }
};
exports.MailsService = MailsService;
exports.MailsService = MailsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailsService);
//# sourceMappingURL=mails.service.js.map