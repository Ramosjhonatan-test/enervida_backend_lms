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
exports.ProgresoLeccionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProgresoLeccionsService = class ProgresoLeccionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        const data = { ...createDto, completado: createDto['completado'] ?? true };
        const registro = await this.prisma.progresoLeccion.create({
            data: data,
        });
        this.updateInscriptionProgress(createDto.usuario_id, createDto.leccion_id).catch(err => console.error('Error actualizando progreso de inscripción:', err));
        return registro;
    }
    async updateInscriptionProgress(usuario_id, leccion_id) {
        const leccion = await this.prisma.leccion.findUnique({
            where: { id: leccion_id },
            include: { modulo: true }
        });
        if (!leccion)
            return;
        const curso_id = leccion.modulo.curso_id;
        const total = await this.prisma.leccion.count({
            where: { modulo: { curso_id } }
        });
        const completadas = await this.prisma.progresoLeccion.count({
            where: {
                usuario_id,
                completado: true,
                leccion: { modulo: { curso_id } }
            }
        });
        const porcentaje = total > 0 ? (completadas / total) * 100 : 0;
        await this.prisma.inscripcion.updateMany({
            where: { usuario_id, curso_id },
            data: {
                porcentaje_progreso: porcentaje,
                fecha_completado: porcentaje >= 100 ? new Date() : null
            }
        });
    }
    async findAll(usuario_id) {
        if (usuario_id) {
            return this.prisma.progresoLeccion.findMany({
                where: { usuario_id }
            });
        }
        return this.prisma.progresoLeccion.findMany();
    }
    async findOne(id) {
        const record = await this.prisma.progresoLeccion.findUnique({ where: { id } });
        if (!record)
            throw new common_1.NotFoundException('Registro no encontrado');
        return record;
    }
    async update(id, updateDto) {
        await this.findOne(id);
        return this.prisma.progresoLeccion.update({
            where: { id },
            data: updateDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.progresoLeccion.delete({
            where: { id },
        });
    }
};
exports.ProgresoLeccionsService = ProgresoLeccionsService;
exports.ProgresoLeccionsService = ProgresoLeccionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProgresoLeccionsService);
//# sourceMappingURL=progreso.service.js.map