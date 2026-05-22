"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVPADto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_vpa_dto_1 = require("./create-vpa.dto");
class UpdateVPADto extends (0, mapped_types_1.PartialType)(create_vpa_dto_1.CreateVPADto) {
}
exports.UpdateVPADto = UpdateVPADto;
//# sourceMappingURL=update-vpa.dto.js.map