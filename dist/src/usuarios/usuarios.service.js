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
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let UsuariosService = class UsuariosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        const { contrasena, ...rest } = createDto;
        const data = { ...rest };
        if (contrasena) {
            data.contrasena_hash = await bcrypt.hash(contrasena, 10);
        }
        return this.prisma.usuario.create({
            data,
        });
    }
    async findAll() {
        return this.prisma.usuario.findMany({
            include: { rol: true }
        });
    }
    async findByRole(roleName) {
        return this.prisma.usuario.findMany({
            where: {
                rol: {
                    nombre: {
                        equals: roleName,
                        mode: 'insensitive'
                    }
                }
            },
            include: { rol: true, inscripciones: true }
        });
    }
    async findOne(id) {
        if (!id)
            throw new common_1.NotFoundException('ID de usuario no proporcionado');
        const record = await this.prisma.usuario.findUnique({
            where: { id },
            include: {
                rol: true,
                inscripciones: {
                    include: {
                        curso: {
                            select: { titulo: true, miniatura_url: true, categoria: { select: { nombre: true } } }
                        }
                    }
                },
                intentos_evaluacion: {
                    include: {
                        evaluacion: {
                            select: { titulo: true, nota_aprobacion: true }
                        }
                    },
                    orderBy: { fecha_inicio: 'desc' }
                },
                auditoria_logs: {
                    take: 50,
                    orderBy: { fecha_creacion: 'desc' }
                },
                dispositivos: {
                    where: { activo: true },
                    orderBy: { fecha_creacion: 'desc' }
                }
            }
        });
        if (!record)
            throw new common_1.NotFoundException('Registro no encontrado');
        return record;
    }
    async update(id, updateDto) {
        await this.findOne(id);
        const { contrasena, ...rest } = updateDto;
        const data = { ...rest };
        if (contrasena) {
            data.contrasena_hash = await bcrypt.hash(contrasena, 10);
        }
        return this.prisma.usuario.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.usuario.delete({
            where: { id },
        });
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map