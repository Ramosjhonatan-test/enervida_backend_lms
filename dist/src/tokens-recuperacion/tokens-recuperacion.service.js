"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensRecuperacionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const uuid_1 = require("uuid");
let TokensRecuperacionService = class TokensRecuperacionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createToken(usuarioId) {
        const token = (0, uuid_1.v4)();
        const expiraEn = new Date();
        expiraEn.setMinutes(expiraEn.getMinutes() + 60);
        return await this.prisma.tokenRecuperacion.create({
            data: {
                usuario_id: usuarioId,
                token,
                expira_en: expiraEn,
            },
        });
    }
    async validateToken(token) {
        const tokenRecord = await this.prisma.tokenRecuperacion.findUnique({
            where: { token },
            include: { usuario: true },
        });
        if (!tokenRecord) {
            throw new common_1.BadRequestException('Token inválido');
        }
        if (tokenRecord.usado) {
            throw new common_1.BadRequestException('El token ya ha sido utilizado');
        }
        if (tokenRecord.expira_en < new Date()) {
            throw new common_1.BadRequestException('El token ha expirado');
        }
        return tokenRecord;
    }
    async markAsUsed(tokenId) {
        await this.prisma.tokenRecuperacion.update({
            where: { id: tokenId },
            data: { usado: true },
        });
    }
};
exports.TokensRecuperacionService = TokensRecuperacionService;
exports.TokensRecuperacionService = TokensRecuperacionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TokensRecuperacionService);
//# sourceMappingURL=tokens-recuperacion.service.js.map