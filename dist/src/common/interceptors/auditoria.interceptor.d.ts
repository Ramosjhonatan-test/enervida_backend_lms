import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuditoriaLogsService } from '../../auditoria/auditoria.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class AuditoriaInterceptor implements NestInterceptor {
    private readonly auditoriaService;
    private readonly prisma;
    constructor(auditoriaService: AuditoriaLogsService, prisma: PrismaService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
    private getModelFromUrl;
}
