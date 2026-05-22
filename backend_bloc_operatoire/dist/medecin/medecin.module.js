"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedecinModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const medecin_entity_1 = require("../entities/medecin.entity");
const medecin_service_1 = require("./medecin.service");
const medecin_controller_1 = require("./medecin.controller");
let MedecinModule = class MedecinModule {
};
exports.MedecinModule = MedecinModule;
exports.MedecinModule = MedecinModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([medecin_entity_1.Medecin])],
        controllers: [medecin_controller_1.MedecinController],
        providers: [medecin_service_1.MedecinService],
        exports: [medecin_service_1.MedecinService],
    })
], MedecinModule);
//# sourceMappingURL=medecin.module.js.map