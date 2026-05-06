import { Module } from '@nestjs/common';
import { ProgresoLeccionsService } from './progreso.service';
import { ProgresoLeccionsController } from './progreso.controller';

@Module({
  controllers: [ProgresoLeccionsController],
  providers: [ProgresoLeccionsService],
})
export class ProgresoLeccionsModule {}
