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
exports.EvaluacionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let EvaluacionsService = class EvaluacionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        return this.prisma.evaluacion.create({
            data: createDto,
        });
    }
    async findAll() {
        return this.prisma.evaluacion.findMany({
            include: {
                curso: {
                    select: { titulo: true }
                },
                _count: {
                    select: { preguntas: true }
                }
            }
        });
    }
    async findOne(id) {
        const record = await this.prisma.evaluacion.findUnique({
            where: { id },
            include: {
                preguntas: {
                    include: {
                        respuestas: true
                    }
                }
            }
        });
        if (!record)
            throw new common_1.NotFoundException('Registro no encontrado');
        return record;
    }
    async update(id, updateDto) {
        await this.findOne(id);
        return this.prisma.evaluacion.update({
            where: { id },
            data: updateDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.evaluacion.delete({
            where: { id },
        });
    }
};
exports.EvaluacionsService = EvaluacionsService;
exports.EvaluacionsService = EvaluacionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EvaluacionsService);
//# sourceMappingURL=evaluaciones.service.js.map