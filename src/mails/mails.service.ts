import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import dns from 'dns';
@Injectable()
export class MailsService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    const port = this.configService.get<number>('SMTP_PORT');

dns.setDefaultResultOrder('ipv4first'); // 👈 fuerza IPv4

    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: Number(this.configService.get<number>('SMTP_PORT')),
      secure: Number(this.configService.get<number>('SMTP_PORT')) === 465, 
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
      pool: false,
      connectionTimeout: 20000, // 20s para establecer conexión
      greetingTimeout: 20000,   // 20s para el saludo
      socketTimeout: 20000,     // 20s de inactividad de socket
      dnsTimeout: 10000,        // 10s para DNS
      tls: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2'
      }
    } as nodemailer.TransportOptions);

  }

  async sendMail(to: string, subject: string, html: string) {
    const fromEmail = this.configService.get<string>('SMTP_USER') || ''; 
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
    } catch (error) {
      console.error('Error enviando correo:', error.message);
      throw error;
    }
  }

  async sendVerificationEmail(email: string, name: string, token: string) {
    const baseUrl = (this.configService.get<string>('FRONTEND_URL') || '').replace(/\/$/, '');
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

  async sendPasswordResetEmail(email: string, name: string, token: string) {
    const baseUrl = (this.configService.get<string>('FRONTEND_URL') || '').replace(/\/$/, '');
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

  async sendAccountBlockedEmail(email: string, name: string) {
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
}
