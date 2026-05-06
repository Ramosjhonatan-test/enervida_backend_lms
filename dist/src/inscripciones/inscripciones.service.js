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
exports.InscripcionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let InscripcionsService = class InscripcionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createDto) {
        const { curso_id } = createDto;
        const existing = await this.prisma.inscripcion.findFirst({
            where: { usuario_id: userId, curso_id }
        });
        if (existing) {
            return existing;
        }
        await this.prisma.progresoLeccion.deleteMany({
            where: {
                usuario_id: userId,
                leccion: { modulo: { curso_id } }
            }
        });
        return this.prisma.inscripcion.create({
            data: {
                ...createDto,
                usuario_id: userId,
                estado: 'PENDIENTE',
                porcentaje_progreso: 0,
            },
        });
    }
    async findAll() {
        return this.prisma.inscripcion.findMany({
            include: {
                curso: true,
                usuario: {
                    select: {
                        id: true,
                        nombres: true,
                        apellidos: true,
                        correo: true,
                        telefono: true,
                        ci: true,
                        imagen_perfil: true
                    }
                }
            },
            orderBy: { fecha_inscripcion: 'desc' }
        });
    }
    async findByUser(usuarioId) {
        return this.prisma.inscripcion.findMany({
            where: { usuario_id: usuarioId },
            include: {
                curso: {
                    include: {
                        categoria: true,
                        instructor: {
                            select: { nombres: true, apellidos: true }
                        }
                    }
                }
            }
        });
    }
    async findOne(id) {
        const record = await this.prisma.inscripcion.findUnique({ where: { id } });
        if (!record)
            throw new common_1.NotFoundException('Registro no encontrado');
        return record;
    }
    async update(id, updateDto) {
        await this.findOne(id);
        return this.prisma.inscripcion.update({
            where: { id },
            data: updateDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.inscripcion.delete({
            where: { id },
        });
    }
};
exports.InscripcionsService = InscripcionsService;
exports.InscripcionsService = InscripcionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InscripcionsService);
//# sourceMappingURL=inscripciones.service.js.map