"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificadoPlantillasModule = void 0;
const common_1 = require("@nestjs/common");
const certificado_plantillas_service_1 = require("./certificado-plantillas.service");
const certificado_plantillas_controller_1 = require("./certificado-plantillas.controller");
let CertificadoPlantillasModule = class CertificadoPlantillasModule {
};
exports.CertificadoPlantillasModule = CertificadoPlantillasModule;
exports.CertificadoPlantillasModule = CertificadoPlantillasModule = __decorate([
    (0, common_1.Module)({
        controllers: [certificado_plantillas_controller_1.CertificadoPlantillasController],
        providers: [certificado_plantillas_service_1.CertificadoPlantillasService],
    })
], CertificadoPlantillasModule);
//# sourceMappingURL=certificado-plantillas.module.js.map