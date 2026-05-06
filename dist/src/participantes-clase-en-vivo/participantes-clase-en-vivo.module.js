"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipanteClaseEnVivosModule = void 0;
const common_1 = require("@nestjs/common");
const participantes_clase_en_vivo_service_1 = require("./participantes-clase-en-vivo.service");
const participantes_clase_en_vivo_controller_1 = require("./participantes-clase-en-vivo.controller");
let ParticipanteClaseEnVivosModule = class ParticipanteClaseEnVivosModule {
};
exports.ParticipanteClaseEnVivosModule = ParticipanteClaseEnVivosModule;
exports.ParticipanteClaseEnVivosModule = ParticipanteClaseEnVivosModule = __decorate([
    (0, common_1.Module)({
        controllers: [participantes_clase_en_vivo_controller_1.ParticipanteClaseEnVivosController],
        providers: [participantes_clase_en_vivo_service_1.ParticipanteClaseEnVivosService],
    })
], ParticipanteClaseEnVivosModule);
//# sourceMappingURL=participantes-clase-en-vivo.module.js.map