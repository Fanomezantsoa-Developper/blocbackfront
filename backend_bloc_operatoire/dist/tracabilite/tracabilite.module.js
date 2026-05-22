"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracabiliteModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const historique_modification_entity_1 = require("../entities/historique-modification.entity");
const tracabilite_service_1 = require("./tracabilite.service");
const tracabilite_controller_1 = require("./tracabilite.controller");
let TracabiliteModule = class TracabiliteModule {
};
exports.TracabiliteModule = TracabiliteModule;
exports.TracabiliteModule = TracabiliteModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([historique_modification_entity_1.HistoriqueModification])],
        controllers: [tracabilite_controller_1.TracabiliteController],
        providers: [tracabilite_service_1.TracabiliteService],
        exports: [tracabilite_service_1.TracabiliteService],
    })
], TracabiliteModule);
//# sourceMappingURL=tracabilite.module.js.map