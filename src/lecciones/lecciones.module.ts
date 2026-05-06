import { Module } from '@nestjs/common';
import { LeccionsService } from './lecciones.service';
import { LeccionsController } from './lecciones.controller';

@Module({
  controllers: [LeccionsController],
  providers: [LeccionsService],
})
export class LeccionsModule {}
