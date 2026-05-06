import { Module } from '@nestjs/common';
import { EvaluacionsService } from './evaluaciones.service';
import { EvaluacionsController } from './evaluaciones.controller';

@Module({
  controllers: [EvaluacionsController],
  providers: [EvaluacionsService],
})
export class EvaluacionsModule {}
