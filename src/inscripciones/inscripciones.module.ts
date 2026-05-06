import { Module } from '@nestjs/common';
import { InscripcionsService } from './inscripciones.service';
import { InscripcionsController } from './inscripciones.controller';

@Module({
  controllers: [InscripcionsController],
  providers: [InscripcionsService],
})
export class InscripcionsModule {}
