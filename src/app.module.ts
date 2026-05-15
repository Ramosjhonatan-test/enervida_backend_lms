import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { AuditoriaInterceptor } from './common/interceptors/auditoria.interceptor';

// Custom / Manual Modules
import { PrismaModule } from './prisma/prisma.module';
// ... rest of imports ...
import { AuthModule } from './auth/auth.module';
// ... (I'll keep the rest as they are, but I need to be careful with the target content)
import { UploadsModule } from './uploads/uploads.module';
import { MailsModule } from './mails/mails.module';
import { ReportesModule } from './reportes/reportes.module';

// Generated CRUD Modules
import { RolsModule } from './roles/roles.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { DispositivoUsuariosModule } from './dispositivos-usuario/dispositivos-usuario.module';
import { CategoriasModule } from './categorias/categorias.module';
import { CursosModule } from './cursos/cursos.module';
import { ModulosModule } from './modulos/modulos.module';
import { LeccionsModule } from './lecciones/lecciones.module';
import { ClaseEnVivosModule } from './clases-en-vivo/clases-en-vivo.module';
import { ParticipanteClaseEnVivosModule } from './participantes-clase-en-vivo/participantes-clase-en-vivo.module';
import { InscripcionsModule } from './inscripciones/inscripciones.module';
import { ProgresoLeccionsModule } from './progreso/progreso.module';
import { EvaluacionsModule } from './evaluaciones/evaluaciones.module';
import { PreguntasModule } from './preguntas/preguntas.module';
import { RespuestasModule } from './respuestas/respuestas.module';
import { IntentoEvaluacionsModule } from './intentos-evaluacion/intentos-evaluacion.module';
import { CertificadosModule } from './certificados/certificados.module';
import { TokensRecuperacionModule } from './tokens-recuperacion/tokens-recuperacion.module';
import { NotificacionsModule } from './notificaciones/notificaciones.module';
import { AuditoriaLogsModule } from './auditoria/auditoria.module';
import { CertificadoPlantillasModule } from './certificado-plantillas/certificado-plantillas.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/',
    }),
    PrismaModule, 
    AuthModule,
    UploadsModule,
    MailsModule,
    ReportesModule,
    
    RolsModule,
    UsuariosModule,
    DispositivoUsuariosModule,
    CategoriasModule,
    CursosModule,
    ModulosModule,
    LeccionsModule,
    ClaseEnVivosModule,
    ParticipanteClaseEnVivosModule,
    InscripcionsModule,
    ProgresoLeccionsModule,
    EvaluacionsModule,
    PreguntasModule,
    RespuestasModule,
    IntentoEvaluacionsModule,
    CertificadosModule,
    TokensRecuperacionModule,
    NotificacionsModule,
    AuditoriaLogsModule,
    CertificadoPlantillasModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditoriaInterceptor,
    },
  ],
})
export class AppModule {}
