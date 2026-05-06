import { Module } from '@nestjs/common';
import { RolsService } from './roles.service';
import { RolsController } from './roles.controller';

@Module({
  controllers: [RolsController],
  providers: [RolsService],
})
export class RolsModule {}
