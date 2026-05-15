"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
const roles_guard_1 = require("./auth/guards/roles.guard");
const auditoria_interceptor_1 = require("./common/interceptors/auditoria.interceptor");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const uploads_module_1 = require("./uploads/uploads.module");
const mails_module_1 = require("./mails/mails.module");
const reportes_module_1 = require("./reportes/reportes.module");
const roles_module_1 = require("./roles/roles.module");
const usuarios_module_1 = require("./usuarios/usuarios.module");
const dispositivos_usuario_module_1 = require("./dispositivos-usuario/dispositivos-usuario.module");
const categorias_module_1 = require("./categorias/categorias.module");
const cursos_module_1 = require("./cursos/cursos.module");
const modulos_module_1 = require("./modulos/modulos.module");
const lecciones_module_1 = require("./lecciones/lecciones.module");
const clases_en_vivo_module_1 = require("./clases-en-vivo/clases-en-vivo.module");
const participantes_clase_en_vivo_module_1 = require("./participantes-clase-en-vivo/participantes-clase-en-vivo.module");
const inscripciones_module_1 = require("./inscripciones/inscripciones.module");
const progreso_module_1 = require("./progreso/progreso.module");
const evaluaciones_module_1 = require("./evaluaciones/evaluaciones.module");
const preguntas_module_1 = require("./preguntas/preguntas.module");
const respuestas_module_1 = require("./respuestas/respuestas.module");
const intentos_evaluacion_module_1 = require("./intentos-evaluacion/intentos-evaluacion.module");
const certificados_module_1 = require("./certificados/certificados.module");
const tokens_recuperacion_module_1 = require("./tokens-recuperacion/tokens-recuperacion.module");
const notificaciones_module_1 = require("./notificaciones/notificaciones.module");
const auditoria_module_1 = require("./auditoria/auditoria.module");
const certificado_plantillas_module_1 = require("./certificado-plantillas/certificado-plantillas.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(process.cwd(), 'public'),
                serveRoot: '/',
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            uploads_module_1.UploadsModule,
            mails_module_1.MailsModule,
            reportes_module_1.ReportesModule,
            roles_module_1.RolsModule,
            usuarios_module_1.UsuariosModule,
            dispositivos_usuario_module_1.DispositivoUsuariosModule,
            categorias_module_1.CategoriasModule,
            cursos_module_1.CursosModule,
            modulos_module_1.ModulosModule,
            lecciones_module_1.LeccionsModule,
            clases_en_vivo_module_1.ClaseEnVivosModule,
            participantes_clase_en_vivo_module_1.ParticipanteClaseEnVivosModule,
            inscripciones_module_1.InscripcionsModule,
            progreso_module_1.ProgresoLeccionsModule,
            evaluaciones_module_1.EvaluacionsModule,
            preguntas_module_1.PreguntasModule,
            respuestas_module_1.RespuestasModule,
            intentos_evaluacion_module_1.IntentoEvaluacionsModule,
            certificados_module_1.CertificadosModule,
            tokens_recuperacion_module_1.TokensRecuperacionModule,
            notificaciones_module_1.NotificacionsModule,
            auditoria_module_1.AuditoriaLogsModule,
            certificado_plantillas_module_1.CertificadoPlantillasModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: auditoria_interceptor_1.AuditoriaInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map