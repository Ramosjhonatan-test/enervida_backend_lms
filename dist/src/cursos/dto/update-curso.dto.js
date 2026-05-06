"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCursoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_curso_dto_1 = require("./create-curso.dto");
class UpdateCursoDto extends (0, swagger_1.PartialType)(create_curso_dto_1.CreateCursoDto) {
}
exports.UpdateCursoDto = UpdateCursoDto;
//# sourceMappingURL=update-curso.dto.js.map