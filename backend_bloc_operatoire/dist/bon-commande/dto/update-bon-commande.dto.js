"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBonCommandeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_bon_commande_dto_1 = require("./create-bon-commande.dto");
class UpdateBonCommandeDto extends (0, mapped_types_1.PartialType)(create_bon_commande_dto_1.CreateBonCommandeDto) {
}
exports.UpdateBonCommandeDto = UpdateBonCommandeDto;
//# sourceMappingURL=update-bon-commande.dto.js.map