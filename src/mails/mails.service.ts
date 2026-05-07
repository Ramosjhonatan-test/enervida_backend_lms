import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailsService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    const port = this.configService.get<number>('SMTP_PORT');


this.transporter = nodemailer.createTransport({
  host: this.configService.get<string>('SMTP_HOST'),
  port: Number(this.configService.get<number>('SMTP_PORT')),
  secure: true,
  auth: {
    user: this.configService.get<string>('SMTP_USER'),
    pass: this.configService.get<string>('SMTP_PASS'),
  },
  tls: {
    family: 4
  }
} as SMTPTransport.Options);

  }

  async sendMail(to: string, subject: string, html: string) {
    const from = this.configService.get<string>('SMTP_FROM');
    try {
      await this.transporter.sendMail({
        from,
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
    const url = `${this.configService.get('FRONTEND_URL')}/verify-email?token=${token}`;
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
    const url = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${token}`;
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
}
