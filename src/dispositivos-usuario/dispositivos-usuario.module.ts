import { Module } from '@nestjs/common';
import { DispositivoUsuariosService } from './dispositivos-usuario.service';
import { DispositivoUsuariosController } from './dispositivos-usuario.controller';

@Module({
  controllers: [DispositivoUsuariosController],
  providers: [DispositivoUsuariosService],
})
export class DispositivoUsuariosModule {}
