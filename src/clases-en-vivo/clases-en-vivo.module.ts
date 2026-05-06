import { Module } from '@nestjs/common';
import { ClaseEnVivosService } from './clases-en-vivo.service';
import { ClaseEnVivosController } from './clases-en-vivo.controller';

@Module({
  controllers: [ClaseEnVivosController],
  providers: [ClaseEnVivosService],
})
export class ClaseEnVivosModule {}
