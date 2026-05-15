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
exports.ReportesController = void 0;
const common_1 = require("@nestjs/common");
const reportes_service_1 = require("./reportes.service");
const swagger_1 = require("@nestjs/swagger");
let ReportesController = class ReportesController {
    service;
    constructor(service) {
        this.service = service;
    }
    getDashboardStats() {
        return this.service.getDashboardStats();
    }
    getEnrollmentsByCourse() {
        return this.service.getEnrollmentsByCourse();
    }
    getInscriptionsByStatus() {
        return this.service.getInscriptionsByStatus();
    }
    getUsersByMonth() {
        return this.service.getUsersByMonth();
    }
    getCoursesByCategory() {
        return this.service.getCoursesByCategory();
    }
    getCertificatesByMonth() {
        return this.service.getCertificatesByMonth();
    }
    getEvaluationResults() {
        return this.service.getEvaluationResults();
    }
};
exports.ReportesController = ReportesController;
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, swagger_1.ApiOperation)({ summary: 'Estadísticas generales para el dashboard' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportesController.prototype, "getDashboardStats", null);
__decorate([
    (0, common_1.Get)('inscripciones-por-curso'),
    (0, swagger_1.ApiOperation)({ summary: 'Inscripciones por curso (top 5)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportesController.prototype, "getEnrollmentsByCourse", null);
__decorate([
    (0, common_1.Get)('inscripciones-por-estado'),
    (0, swagger_1.ApiOperation)({ summary: 'Distribución de inscripciones por estado' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportesController.prototype, "getInscriptionsByStatus", null);
__decorate([
    (0, common_1.Get)('usuarios-por-mes'),
    (0, swagger_1.ApiOperation)({ summary: 'Registro de usuarios por mes (últimos 6)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportesController.prototype, "getUsersByMonth", null);
__decorate([
    (0, common_1.Get)('cursos-por-categoria'),
    (0, swagger_1.ApiOperation)({ summary: 'Cantidad de cursos por categoría' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportesController.prototype, "getCoursesByCategory", null);
__decorate([
    (0, common_1.Get)('certificados-por-mes'),
    (0, swagger_1.ApiOperation)({ summary: 'Certificados emitidos por mes (últimos 6)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportesController.prototype, "getCertificatesByMonth", null);
__decorate([
    (0, common_1.Get)('evaluaciones-resultados'),
    (0, swagger_1.ApiOperation)({ summary: 'Proporción de evaluaciones aprobadas vs reprobadas' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportesController.prototype, "getEvaluationResults", null);
exports.ReportesController = ReportesController = __decorate([
    (0, swagger_1.ApiTags)('reportes'),
    (0, common_1.Controller)('reportes'),
    __metadata("design:paramtypes", [reportes_service_1.ReportesService])
], ReportesController);
//# sourceMappingURL=reportes.controller.js.map