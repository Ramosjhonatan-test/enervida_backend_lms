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
exports.DispositivoUsuariosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DispositivoUsuariosService = class DispositivoUsuariosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        return this.prisma.dispositivoUsuario.create({
            data: createDto,
        });
    }
    async findAll() {
        return this.prisma.dispositivoUsuario.findMany();
    }
    async findOne(id) {
        const record = await this.prisma.dispositivoUsuario.findUnique({ where: { id } });
        if (!record)
            throw new common_1.NotFoundException('Registro no encontrado');
        return record;
    }
    async update(id, updateDto) {
        await this.findOne(id);
        return this.prisma.dispositivoUsuario.update({
            where: { id },
            data: updateDto,
        });
    }
    async deactivateAllForUser(usuarioId) {
        return this.prisma.dispositivoUsuario.updateMany({
            where: { usuario_id: usuarioId, activo: true },
            data: { activo: false },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.dispositivoUsuario.delete({
            where: { id },
        });
    }
};
exports.DispositivoUsuariosService = DispositivoUsuariosService;
exports.DispositivoUsuariosService = DispositivoUsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DispositivoUsuariosService);
//# sourceMappingURL=dispositivos-usuario.service.js.map