"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Medecin = exports.OrdreProfessionnel = exports.RoleMedecin = void 0;
const typeorm_1 = require("typeorm");
var RoleMedecin;
(function (RoleMedecin) {
    RoleMedecin["CHIRURGIEN"] = "CHIRURGIEN";
    RoleMedecin["ANESTHESISTE"] = "ANESTHESISTE";
    RoleMedecin["MEDECIN_RESPONSABLE"] = "MEDECIN_RESPONSABLE";
    RoleMedecin["INFIRMIER"] = "INFIRMIER";
    RoleMedecin["TECHNICIEN"] = "TECHNICIEN";
    RoleMedecin["DIRECTEUR_MEDICAL"] = "DIRECTEUR_MEDICAL";
})(RoleMedecin || (exports.RoleMedecin = RoleMedecin = {}));
var OrdreProfessionnel;
(function (OrdreProfessionnel) {
    OrdreProfessionnel["ONM"] = "ONM";
    OrdreProfessionnel["ONIM"] = "ONIM";
    OrdreProfessionnel["ONSFM"] = "ONSFM";
    OrdreProfessionnel["ONPM"] = "ONPM";
    OrdreProfessionnel["AUTRE"] = "AUTRE";
})(OrdreProfessionnel || (exports.OrdreProfessionnel = OrdreProfessionnel = {}));
let Medecin = class Medecin {
    id;
    nom;
    prenom;
    initiales;
    role;
    numeroOrdre;
    ordre;
    telephone;
    email;
    matricule;
    createdAt;
    updatedAt;
};
exports.Medecin = Medecin;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Medecin.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Medecin.prototype, "nom", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Medecin.prototype, "prenom", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10 }),
    __metadata("design:type", String)
], Medecin.prototype, "initiales", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: RoleMedecin }),
    __metadata("design:type", String)
], Medecin.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, unique: true }),
    __metadata("design:type", String)
], Medecin.prototype, "numeroOrdre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: OrdreProfessionnel }),
    __metadata("design:type", String)
], Medecin.prototype, "ordre", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], Medecin.prototype, "telephone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Medecin.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Medecin.prototype, "matricule", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Medecin.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Medecin.prototype, "updatedAt", void 0);
exports.Medecin = Medecin = __decorate([
    (0, typeorm_1.Entity)('medecins')
], Medecin);
//# sourceMappingURL=medecin.entity.js.map