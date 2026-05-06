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
exports.CursosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CursosService = class CursosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        return this.prisma.curso.create({
            data: createDto,
        });
    }
    async findAll() {
        const cursos = await this.prisma.curso.findMany({
            include: {
                categoria: true,
                instructor: { select: { nombres: true, apellidos: true } },
                plantilla_certificado: true
            }
        });
        console.log('Cursos with templates:', JSON.stringify(cursos.map(c => ({ id: c.id, hasTemplate: !!c.plantilla_certificado })), null, 2));
        return cursos;
    }
    async findPublished() {
        return this.prisma.curso.findMany({
            where: { publicado: true },
            include: {
                categoria: true,
                instructor: { select: { nombres: true, apellidos: true } }
            }
        });
    }
    async findOne(id) {
        const record = await this.prisma.curso.findUnique({
            where: { id },
            include: {
                categoria: true,
                instructor: true,
                plantilla_certificado: true,
                modulos: {
                    orderBy: { orden_modulo: 'asc' },
                    include: {
                        lecciones: {
                            orderBy: { orden_leccion: 'asc' }
                        }
                    }
                },
                evaluaciones: true
            }
        });
        if (!record)
            throw new common_1.NotFoundException('Registro no encontrado');
        return record;
    }
    async update(id, updateDto) {
        await this.findOne(id);
        return this.prisma.curso.update({
            where: { id },
            data: updateDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.curso.delete({
            where: { id },
        });
    }
};
exports.CursosService = CursosService;
exports.CursosService = CursosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CursosService);
//# sourceMappingURL=cursos.service.js.map