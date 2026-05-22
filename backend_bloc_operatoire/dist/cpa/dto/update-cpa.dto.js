"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCPADto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_cpa_dto_1 = require("./create-cpa.dto");
class UpdateCPADto extends (0, mapped_types_1.PartialType)(create_cpa_dto_1.CreateCPADto) {
}
exports.UpdateCPADto = UpdateCPADto;
//# sourceMappingURL=update-cpa.dto.js.map