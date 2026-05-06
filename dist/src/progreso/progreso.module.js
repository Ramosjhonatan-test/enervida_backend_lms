"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgresoLeccionsModule = void 0;
const common_1 = require("@nestjs/common");
const progreso_service_1 = require("./progreso.service");
const progreso_controller_1 = require("./progreso.controller");
let ProgresoLeccionsModule = class ProgresoLeccionsModule {
};
exports.ProgresoLeccionsModule = ProgresoLeccionsModule;
exports.ProgresoLeccionsModule = ProgresoLeccionsModule = __decorate([
    (0, common_1.Module)({
        controllers: [progreso_controller_1.ProgresoLeccionsController],
        providers: [progreso_service_1.ProgresoLeccionsService],
    })
], ProgresoLeccionsModule);
//# sourceMappingURL=progreso.module.js.map