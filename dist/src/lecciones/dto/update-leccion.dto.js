"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLeccionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_leccion_dto_1 = require("./create-leccion.dto");
class UpdateLeccionDto extends (0, swagger_1.PartialType)(create_leccion_dto_1.CreateLeccionDto) {
}
exports.UpdateLeccionDto = UpdateLeccionDto;
//# sourceMappingURL=update-leccion.dto.js.map