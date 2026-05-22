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
exports.ItemCommande = void 0;
const typeorm_1 = require("typeorm");
const bon_commande_anesthesie_entity_1 = require("./bon-commande-anesthesie.entity");
let ItemCommande = class ItemCommande {
    id;
    nom;
    selectionne;
    quantite;
    dosage;
    observation;
    bonCommande;
};
exports.ItemCommande = ItemCommande;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ItemCommande.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ItemCommande.prototype, "nom", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ItemCommande.prototype, "selectionne", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ItemCommande.prototype, "quantite", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ItemCommande.prototype, "dosage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ItemCommande.prototype, "observation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bon_commande_anesthesie_entity_1.BonCommandeAnesthesie, (bon) => bon.items),
    __metadata("design:type", bon_commande_anesthesie_entity_1.BonCommandeAnesthesie)
], ItemCommande.prototype, "bonCommande", void 0);
exports.ItemCommande = ItemCommande = __decorate([
    (0, typeorm_1.Entity)('items_commande')
], ItemCommande);
//# sourceMappingURL=item-commande.entity.js.map