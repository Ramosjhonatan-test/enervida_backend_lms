import { Module } from '@nestjs/common';
import { TokensRecuperacionService } from './tokens-recuperacion.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [TokensRecuperacionService],
  exports: [TokensRecuperacionService],
})
export class TokensRecuperacionModule {}
