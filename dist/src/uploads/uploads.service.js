"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let UploadsService = class UploadsService {
    prisma;
    uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        if (!fs.existsSync(this.uploadsDir)) {
            return [];
        }
        const files = fs.readdirSync(this.uploadsDir);
        const fileList = [];
        for (const filename of files) {
            const filePath = path.join(this.uploadsDir, filename);
            const stats = fs.statSync(filePath);
            if (stats.isFile()) {
                const usages = await this.checkUsage(filename);
                fileList.push({
                    filename,
                    size: stats.size,
                    createdAt: stats.birthtime,
                    isUsed: usages.length > 0,
                    usages,
                    url: `/uploads/${filename}`,
                });
            }
        }
        return fileList;
    }
    async checkUsage(filename) {
        const fileUrl = `/uploads/${filename}`;
        const usages = [];
        const usuarios = await this.prisma.usuario.findMany({
            where: {
                OR: [
                    { imagen_perfil: { contains: filename } },
                    { imagen_perfil: { contains: fileUrl } }
                ]
            },
            select: { id: true, nombres: true, apellidos: true },
            take: 1
        });
        usuarios.forEach(u => usages.push({ type: 'Usuario', name: `${u.nombres} ${u.apellidos}`, id: u.id }));
        const cursos = await this.prisma.curso.findMany({
            where: {
                OR: [
                    { miniatura_url: { contains: filename } },
                    { miniatura_url: { contains: fileUrl } }
                ]
            },
            select: { id: true, titulo: true },
            take: 1
        });
        cursos.forEach(c => usages.push({ type: 'Curso (Miniatura)', name: c.titulo, id: c.id }));
        const plantillas = await this.prisma.certificadoPlantilla.findMany({
            where: {
                OR: [
                    { background_url: { contains: filename } },
                    { background_url: { contains: fileUrl } }
                ]
            },
            select: { id: true, nombre: true, curso_id: true },
            take: 1
        });
        plantillas.forEach(p => usages.push({ type: 'Plantilla Certificado', name: p.nombre, id: p.curso_id }));
        const lecciones = await this.prisma.leccion.findMany({
            where: {
                OR: [
                    { video_url: { contains: filename } },
                    { video_url: { contains: fileUrl } },
                    { pdf_url: { contains: filename } },
                    { pdf_url: { contains: fileUrl } }
                ],
            },
            select: {
                id: true,
                titulo: true,
                modulo: { select: { curso: { select: { id: true, titulo: true } } } }
            },
            take: 3
        });
        lecciones.forEach(l => usages.push({
            type: 'Lección',
            name: `${l.modulo?.curso?.titulo || 'Sin Curso'} > ${l.titulo}`,
            id: l.modulo?.curso?.id || 0
        }));
        const searchPatterns = [filename, fileUrl];
        const certificados = await this.prisma.certificado.findMany({
            where: { OR: searchPatterns.map(p => ({ pdf_url: { contains: p } })) },
            select: { id: true, codigo_certificado: true },
            take: 1
        });
        certificados.forEach(c => usages.push({ type: 'Certificado Emitido', name: c.codigo_certificado, id: c.id }));
        return usages;
    }
    async deleteFile(filename) {
        const filePath = path.join(this.uploadsDir, filename);
        if (!fs.existsSync(filePath)) {
            throw new common_1.NotFoundException('Archivo no encontrado');
        }
        fs.unlinkSync(filePath);
        return { message: 'Archivo eliminado con éxito' };
    }
    async deleteBulk(filenames) {
        let deletedCount = 0;
        const errors = [];
        for (const filename of filenames) {
            try {
                const usages = await this.checkUsage(filename);
                if (usages.length > 0) {
                    errors.push(`El archivo ${filename} está en uso y no puede ser eliminado.`);
                    continue;
                }
                const filePath = path.join(this.uploadsDir, filename);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    deletedCount++;
                }
            }
            catch (error) {
                errors.push(`Error eliminando ${filename}: ${error.message}`);
            }
        }
        return {
            message: `${deletedCount} archivos eliminados con éxito`,
            deletedCount,
            errors: errors.length > 0 ? errors : undefined,
        };
    }
};
exports.UploadsService = UploadsService;
exports.UploadsService = UploadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UploadsService);
//# sourceMappingURL=uploads.service.js.map