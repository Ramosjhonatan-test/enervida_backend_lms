"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInscripcionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_inscripcion_dto_1 = require("./create-inscripcion.dto");
class UpdateInscripcionDto extends (0, swagger_1.PartialType)(create_inscripcion_dto_1.CreateInscripcionDto) {
}
exports.UpdateInscripcionDto = UpdateInscripcionDto;
//# sourceMappingURL=update-inscripcion.dto.js.map