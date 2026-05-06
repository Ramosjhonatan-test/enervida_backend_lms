import { Module } from '@nestjs/common';
import { ParticipanteClaseEnVivosService } from './participantes-clase-en-vivo.service';
import { ParticipanteClaseEnVivosController } from './participantes-clase-en-vivo.controller';

@Module({
  controllers: [ParticipanteClaseEnVivosController],
  providers: [ParticipanteClaseEnVivosService],
})
export class ParticipanteClaseEnVivosModule {}
