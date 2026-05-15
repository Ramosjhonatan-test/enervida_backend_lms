import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditoriaLogsService } from '../../auditoria/auditoria.service';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditoriaInterceptor implements NestInterceptor {
  constructor(
    private readonly auditoriaService: AuditoriaLogsService,
    private readonly prisma: PrismaService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, user } = request;
    
    // Capturar IP de forma robusta
    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress || request.ip;
    const userAgent = request.get('user-agent') || '';

    // Solo capturar mutaciones
    const targetMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
    if (!targetMethods.includes(method)) {
      return next.handle();
    }

    // Excluir rutas de auditoría para evitar bucles
    if (url.includes('/auditoria') || url.includes('/auth/refresh')) {
      return next.handle();
    }

    const modelName = this.getModelFromUrl(url);
    let valores_anteriores = null;

    // Capturar estado anterior para UPDATES y DELETES
    if (modelName && ['PUT', 'PATCH', 'DELETE'].includes(method)) {
      try {
        const id = parseInt(request.params.id);
        if (!isNaN(id) && (this.prisma as any)[modelName]) {
          valores_anteriores = await (this.prisma as any)[modelName].findUnique({ where: { id } });
        }
      } catch (err) {
        // Ignorar si no se puede obtener el estado anterior
      }
    }

    return next.handle().pipe(
      tap(async (response) => {
        try {
          const urlParts = url.split('/').filter(p => p && !p.includes('?'));
          const entidad = urlParts[0] || 'unknown';
          
          let entidad_id: number | null = null;
          if (request.params.id) {
            entidad_id = parseInt(request.params.id);
          } else if (response && typeof response === 'object' && response.id) {
            entidad_id = parseInt(response.id);
          }

          const accion = `${method}_${entidad.toUpperCase()}`;
          const usuarioStr = user ? `${user.email} (ID: ${user.sub || user.id})` : 'Usuario Anónimo';
          const descripcion = `${usuarioStr} ejecutó ${method} en ${entidad}${entidad_id ? ` #${entidad_id}` : ''}`;

          // Limpiar datos sensibles
          const safeBody = body ? { ...body } : {};
          ['contrasena', 'password', 'token', 'access_token', 'refresh_token', 'contrasena_hash'].forEach(f => delete safeBody[f]);

          await this.auditoriaService.log({
            usuario_id: user?.sub || user?.id || (response?.user?.id) || null,
            accion,
            entidad,
            entidad_id: (entidad_id && !isNaN(entidad_id)) ? entidad_id : undefined,
            descripcion,
            valores_anteriores: valores_anteriores || undefined,
            valores_nuevos: Object.keys(safeBody).length > 0 ? safeBody : undefined,
            direccion_ip: Array.isArray(ip) ? ip[0] : ip,
            user_agent: userAgent,
            metodo_request: method,
            endpoint: url,
          });
        } catch (error) {
          console.error('[AuditoriaInterceptor] Error logging:', error.message);
        }
      }),
    );
  }

  private getModelFromUrl(url: string): string | null {
    const parts = url.split('/').filter(p => p && !p.includes('?'));
    const entity = parts[0]?.toLowerCase();
    if (!entity) return null;

    const mapping: Record<string, string> = {
      'usuarios': 'usuario',
      'cursos': 'curso',
      'categorias': 'categoria',
      'modulos': 'modulo',
      'lecciones': 'leccion',
      'evaluaciones': 'evaluacion',
      'preguntas': 'pregunta',
      'respuestas': 'respuesta',
      'inscripciones': 'inscripcion',
      'certificados': 'certificado',
      'roles': 'rol',
      'certificado_plantillas': 'certificadoPlantilla',
      'clases_en_vivo': 'claseEnVivo',
      'dispositivos_usuario': 'dispositivoUsuario',
      'notificaciones': 'notificacion'
    };

    return mapping[entity] || entity.replace(/s$/, ''); // Fallback naive
  }
}

