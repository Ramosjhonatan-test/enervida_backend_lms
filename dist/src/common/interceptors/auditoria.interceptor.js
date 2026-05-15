"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditoriaInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const auditoria_service_1 = require("../../auditoria/auditoria.service");
const prisma_service_1 = require("../../prisma/prisma.service");
let AuditoriaInterceptor = class AuditoriaInterceptor {
    auditoriaService;
    prisma;
    constructor(auditoriaService, prisma) {
        this.auditoriaService = auditoriaService;
        this.prisma = prisma;
    }
    async intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { method, url, body, user } = request;
        const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress || request.ip;
        const userAgent = request.get('user-agent') || '';
        const targetMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
        if (!targetMethods.includes(method)) {
            return next.handle();
        }
        if (url.includes('/auditoria') || url.includes('/auth/refresh')) {
            return next.handle();
        }
        const modelName = this.getModelFromUrl(url);
        let valores_anteriores = null;
        if (modelName && ['PUT', 'PATCH', 'DELETE'].includes(method)) {
            try {
                const id = parseInt(request.params.id);
                if (!isNaN(id) && this.prisma[modelName]) {
                    valores_anteriores = await this.prisma[modelName].findUnique({ where: { id } });
                }
            }
            catch (err) {
            }
        }
        return next.handle().pipe((0, operators_1.tap)(async (response) => {
            try {
                const urlParts = url.split('/').filter(p => p && !p.includes('?'));
                const entidad = urlParts[0] || 'unknown';
                let entidad_id = null;
                if (request.params.id) {
                    entidad_id = parseInt(request.params.id);
                }
                else if (response && typeof response === 'object' && response.id) {
                    entidad_id = parseInt(response.id);
                }
                const accion = `${method}_${entidad.toUpperCase()}`;
                const usuarioStr = user ? `${user.email} (ID: ${user.sub || user.id})` : 'Usuario Anónimo';
                const descripcion = `${usuarioStr} ejecutó ${method} en ${entidad}${entidad_id ? ` #${entidad_id}` : ''}`;
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
            }
            catch (error) {
                console.error('[AuditoriaInterceptor] Error logging:', error.message);
            }
        }));
    }
    getModelFromUrl(url) {
        const parts = url.split('/').filter(p => p && !p.includes('?'));
        const entity = parts[0]?.toLowerCase();
        if (!entity)
            return null;
        const mapping = {
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
        return mapping[entity] || entity.replace(/s$/, '');
    }
};
exports.AuditoriaInterceptor = AuditoriaInterceptor;
exports.AuditoriaInterceptor = AuditoriaInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auditoria_service_1.AuditoriaLogsService,
        prisma_service_1.PrismaService])
], AuditoriaInterceptor);
//# sourceMappingURL=auditoria.interceptor.js.map