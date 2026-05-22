"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMedecinDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_medecin_dto_1 = require("./create-medecin.dto");
class UpdateMedecinDto extends (0, mapped_types_1.PartialType)(create_medecin_dto_1.CreateMedecinDto) {
}
exports.UpdateMedecinDto = UpdateMedecinDto;
//# sourceMappingURL=update-medecin.dto.js.map