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
exports.ReportesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReportesService = class ReportesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboardStats() {
        const [totalCursos, totalEstudiantes, totalInscripciones, totalVentas] = await Promise.all([
            this.prisma.curso.count(),
            this.prisma.usuario.count({ where: { rol: { nombre: 'estudiante' } } }),
            this.prisma.inscripcion.count(),
            this.prisma.curso.aggregate({ _sum: { precio: true } })
        ]);
        return {
            totalCursos,
            totalEstudiantes,
            totalInscripciones,
            totalVentas: totalVentas._sum.precio || 0
        };
    }
    async getEnrollmentsByCourse() {
        return this.prisma.curso.findMany({
            select: {
                titulo: true,
                _count: {
                    select: { inscripciones: true }
                }
            },
            orderBy: {
                inscripciones: { _count: 'desc' }
            },
            take: 5
        });
    }
};
exports.ReportesService = ReportesService;
exports.ReportesService = ReportesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportesService);
//# sourceMappingURL=reportes.service.js.map