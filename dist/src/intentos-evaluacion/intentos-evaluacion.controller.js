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
exports.IntentoEvaluacionsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const user_decorator_1 = require("../auth/decorators/user.decorator");
const intentos_evaluacion_service_1 = require("./intentos-evaluacion.service");
const create_intento_evaluacion_dto_1 = require("./dto/create-intento-evaluacion.dto");
const update_intento_evaluacion_dto_1 = require("./dto/update-intento-evaluacion.dto");
const swagger_1 = require("@nestjs/swagger");
let IntentoEvaluacionsController = class IntentoEvaluacionsController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(createDto, userId) {
        if (userId) {
            createDto.usuario_id = Number(userId);
        }
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
};
exports.IntentoEvaluacionsController = IntentoEvaluacionsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Crear IntentoEvaluacion' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_intento_evaluacion_dto_1.CreateIntentoEvaluacionDto, Number]),
    __metadata("design:returntype", void 0)
], IntentoEvaluacionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos los IntentoEvaluacions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IntentoEvaluacionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un IntentoEvaluacion por ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], IntentoEvaluacionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un IntentoEvaluacion' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_intento_evaluacion_dto_1.UpdateIntentoEvaluacionDto]),
    __metadata("design:returntype", void 0)
], IntentoEvaluacionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un IntentoEvaluacion' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], IntentoEvaluacionsController.prototype, "remove", null);
exports.IntentoEvaluacionsController = IntentoEvaluacionsController = __decorate([
    (0, swagger_1.ApiTags)('intentos-evaluacion'),
    (0, common_1.Controller)('intentos-evaluacion'),
    __metadata("design:paramtypes", [intentos_evaluacion_service_1.IntentoEvaluacionsService])
], IntentoEvaluacionsController);
//# sourceMappingURL=intentos-evaluacion.controller.js.map