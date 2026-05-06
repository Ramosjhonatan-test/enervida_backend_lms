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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificadosController = void 0;
const common_1 = require("@nestjs/common");
const certificados_service_1 = require("./certificados.service");
const create_certificado_dto_1 = require("./dto/create-certificado.dto");
const update_certificado_dto_1 = require("./dto/update-certificado.dto");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../auth/decorators/user.decorator");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const common_2 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let CertificadosController = class CertificadosController {
    service;
    constructor(service) {
        this.service = service;
    }
    findMyCertificates(userId) {
        return this.service.findByUserId(userId);
    }
    create(createDto) {
        return this.service.create(createDto);
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    update(id, updateDto) {
        return this.service.update(id, updateDto);
    }
    remove(id) {
        return this.service.remove(id);
    }
    async download(id, res) {
        const buffer = await this.service.generatePdf(id);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=certificado-${id}.pdf`,
            'Content-Length': buffer.length,
        });
        res.end(buffer);
    }
    async preview(plantillaId, res) {
        const buffer = await this.service.generatePreview(plantillaId);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename=preview.pdf',
            'Content-Length': buffer.length,
        });
        res.end(buffer);
    }
};
exports.CertificadosController = CertificadosController;
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener mis certificados' }),
    __param(0, (0, user_decorator_1.User)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CertificadosController.prototype, "findMyCertificates", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear Certificado' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_certificado_dto_1.CreateCertificadoDto]),
    __metadata("design:returntype", void 0)
], CertificadosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos los Certificados' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CertificadosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un Certificado por ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CertificadosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un Certificado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_certificado_dto_1.UpdateCertificadoDto]),
    __metadata("design:returntype", void 0)
], CertificadosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un Certificado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CertificadosController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/download'),
    (0, swagger_1.ApiOperation)({ summary: 'Descargar Certificado en PDF' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CertificadosController.prototype, "download", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('preview/:plantillaId'),
    (0, swagger_1.ApiOperation)({ summary: 'Previsualizar Plantilla de Certificado' }),
    __param(0, (0, common_1.Param)('plantillaId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CertificadosController.prototype, "preview", null);
exports.CertificadosController = CertificadosController = __decorate([
    (0, swagger_1.ApiTags)('certificados'),
    (0, common_1.Controller)('certificados'),
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [certificados_service_1.CertificadosService])
], CertificadosController);
//# sourceMappingURL=certificados.controller.js.map