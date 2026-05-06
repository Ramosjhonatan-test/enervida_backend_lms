import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TokensRecuperacionService {
  constructor(private prisma: PrismaService) {}

  async createToken(usuarioId: number) {
    const token = uuidv4();
    const expiraEn = new Date();
    expiraEn.setHours(expiraEn.getMinutes() + 10); // 10 minutes expiration

    return await this.prisma.tokenRecuperacion.create({
      data: {
        usuario_id: usuarioId,
        token,
        expira_en: expiraEn,
      },
    });
  }

  async validateToken(token: string) {
    const tokenRecord = await this.prisma.tokenRecuperacion.findUnique({
      where: { token },
      include: { usuario: true },
    });

    if (!tokenRecord) {
      throw new BadRequestException('Token inválido');
    }

    if (tokenRecord.usado) {
      throw new BadRequestException('El token ya ha sido utilizado');
    }

    if (tokenRecord.expira_en < new Date()) {
      throw new BadRequestException('El token ha expirado');
    }

    return tokenRecord;
  }

  async markAsUsed(tokenId: number) {
    await this.prisma.tokenRecuperacion.update({
      where: { id: tokenId },
      data: { usado: true },
    });
  }
}
