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
exports.IntentoEvaluacionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const certificados_service_1 = require("../certificados/certificados.service");
let IntentoEvaluacionsService = class IntentoEvaluacionsService {
    prisma;
    certificadosService;
    constructor(prisma, certificadosService) {
        this.prisma = prisma;
        this.certificadosService = certificadosService;
    }
    async create(createDto) {
        const usuario_id = Number(createDto.usuario_id);
        const evaluacion_id = Number(createDto.evaluacion_id);
        const evaluacion = await this.prisma.evaluacion.findUnique({
            where: { id: evaluacion_id },
            select: { nota_aprobacion: true, curso_id: true, intentos_permitidos: true }
        });
        if (!evaluacion) {
            throw new common_1.NotFoundException('Evaluación no encontrada.');
        }
        const intentosPrevios = await this.prisma.intentoEvaluacion.count({
            where: { evaluacion_id, usuario_id }
        });
        const maxIntentos = evaluacion.intentos_permitidos || 1;
        if (intentosPrevios >= maxIntentos) {
            throw new common_1.BadRequestException(`Has agotado tus ${maxIntentos} intento(s) permitido(s) para esta evaluación.`);
        }
        const yaAprobo = await this.prisma.intentoEvaluacion.findFirst({
            where: { evaluacion_id, usuario_id, aprobado: true }
        });
        if (yaAprobo) {
            throw new common_1.BadRequestException('Ya aprobaste esta evaluación.');
        }
        const intento = await this.prisma.intentoEvaluacion.create({
            data: createDto,
        });
        console.log(`Intento ${intentosPrevios + 1}/${maxIntentos} para usuario ${usuario_id}, evaluación ${evaluacion_id}, nota ${createDto.nota}`);
        let certificado = null;
        if (Number(createDto.nota) >= Number(evaluacion.nota_aprobacion)) {
            certificado = await this.certificadosService.issueCertificate(usuario_id, evaluacion.curso_id);
            console.log('Resultado de emisión:', certificado ? 'ÉXITO' : 'FALLO (posiblemente falta plantilla)');
            try {
                await this.prisma.inscripcion.updateMany({
                    where: { usuario_id, curso_id: evaluacion.curso_id },
                    data: { estado: 'COMPLETADO', porcentaje_progreso: 100 }
                });
                console.log(`Inscripción marcada como COMPLETADO para usuario ${usuario_id}, curso ${evaluacion.curso_id}`);
            }
            catch (e) {
                console.error('Error al actualizar inscripción:', e.message);
            }
        }
        else {
            console.log('No alcanzó la nota de aprobación.');
        }
        return {
            ...intento,
            certificado,
            intentos_usados: intentosPrevios + 1,
            intentos_permitidos: maxIntentos,
        };
    }
    async findAll() {
        return this.prisma.intentoEvaluacion.findMany();
    }
    async findOne(id) {
        const record = await this.prisma.intentoEvaluacion.findUnique({ where: { id } });
        if (!record)
            throw new common_1.NotFoundException('Registro no encontrado');
        return record;
    }
    async update(id, updateDto) {
        await this.findOne(id);
        return this.prisma.intentoEvaluacion.update({
            where: { id },
            data: updateDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.intentoEvaluacion.delete({
            where: { id },
        });
    }
};
exports.IntentoEvaluacionsService = IntentoEvaluacionsService;
exports.IntentoEvaluacionsService = IntentoEvaluacionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        certificados_service_1.CertificadosService])
], IntentoEvaluacionsService);
//# sourceMappingURL=intentos-evaluacion.service.js.map