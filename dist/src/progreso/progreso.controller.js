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
exports.ProgresoLeccionsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const user_decorator_1 = require("../auth/decorators/user.decorator");
const progreso_service_1 = require("./progreso.service");
const create_progreso_leccion_dto_1 = require("./dto/create-progreso-leccion.dto");
const update_progreso_leccion_dto_1 = require("./dto/update-progreso-leccion.dto");
const swagger_1 = require("@nestjs/swagger");
let ProgresoLeccionsController = class ProgresoLeccionsController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(userId, createDto) {
        createDto.usuario_id = userId;
        return this.service.create(createDto);
    }
    findAll(userId) {
        return this.service.findAll(userId);
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
};
exports.ProgresoLeccionsController = ProgresoLeccionsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Crear ProgresoLeccion' }),
    __param(0, (0, user_decorator_1.User)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_progreso_leccion_dto_1.CreateProgresoLeccionDto]),
    __metadata("design:returntype", void 0)
], ProgresoLeccionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Listar mis progresos de lección' }),
    __param(0, (0, user_decorator_1.User)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProgresoLeccionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un ProgresoLeccion por ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProgresoLeccionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un ProgresoLeccion' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_progreso_leccion_dto_1.UpdateProgresoLeccionDto]),
    __metadata("design:returntype", void 0)
], ProgresoLeccionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un ProgresoLeccion' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProgresoLeccionsController.prototype, "remove", null);
exports.ProgresoLeccionsController = ProgresoLeccionsController = __decorate([
    (0, swagger_1.ApiTags)('progreso'),
    (0, common_1.Controller)('progreso'),
    __metadata("design:paramtypes", [progreso_service_1.ProgresoLeccionsService])
], ProgresoLeccionsController);
//# sourceMappingURL=progreso.controller.js.map