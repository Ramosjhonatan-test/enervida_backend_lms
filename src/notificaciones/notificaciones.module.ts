import { Module } from '@nestjs/common';
import { NotificacionsService } from './notificaciones.service';
import { NotificacionsController } from './notificaciones.controller';

@Module({
  controllers: [NotificacionsController],
  providers: [NotificacionsService],
})
export class NotificacionsModule {}
