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
exports.AuditoriaLogsController = void 0;
const common_1 = require("@nestjs/common");
const auditoria_service_1 = require("./auditoria.service");
const create_auditoria_log_dto_1 = require("./dto/create-auditoria-log.dto");
const update_auditoria_log_dto_1 = require("./dto/update-auditoria-log.dto");
const swagger_1 = require("@nestjs/swagger");
let AuditoriaLogsController = class AuditoriaLogsController {
    service;
    constructor(service) {
        this.service = service;
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
    deleteAll() {
        return this.service.deleteAll();
    }
};
exports.AuditoriaLogsController = AuditoriaLogsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear AuditoriaLog' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auditoria_log_dto_1.CreateAuditoriaLogDto]),
    __metadata("design:returntype", void 0)
], AuditoriaLogsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos los AuditoriaLogs' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuditoriaLogsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un AuditoriaLog por ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AuditoriaLogsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un AuditoriaLog' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_auditoria_log_dto_1.UpdateAuditoriaLogDto]),
    __metadata("design:returntype", void 0)
], AuditoriaLogsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un AuditoriaLog' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AuditoriaLogsController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)('all/clear'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar todos los AuditoriaLogs' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuditoriaLogsController.prototype, "deleteAll", null);
exports.AuditoriaLogsController = AuditoriaLogsController = __decorate([
    (0, swagger_1.ApiTags)('auditoria'),
    (0, common_1.Controller)('auditoria'),
    __metadata("design:paramtypes", [auditoria_service_1.AuditoriaLogsService])
], AuditoriaLogsController);
//# sourceMappingURL=auditoria.controller.js.map