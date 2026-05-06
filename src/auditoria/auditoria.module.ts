import { Module } from '@nestjs/common';
import { AuditoriaLogsService } from './auditoria.service';
import { AuditoriaLogsController } from './auditoria.controller';

@Module({
  controllers: [AuditoriaLogsController],
  providers: [AuditoriaLogsService],
  exports: [AuditoriaLogsService],
})
export class AuditoriaLogsModule {}
