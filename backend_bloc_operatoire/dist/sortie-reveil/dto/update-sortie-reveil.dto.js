"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSortieReveilDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_sortie_reveil_dto_1 = require("./create-sortie-reveil.dto");
class UpdateSortieReveilDto extends (0, mapped_types_1.PartialType)(create_sortie_reveil_dto_1.CreateSortieReveilDto) {
}
exports.UpdateSortieReveilDto = UpdateSortieReveilDto;
//# sourceMappingURL=update-sortie-reveil.dto.js.map