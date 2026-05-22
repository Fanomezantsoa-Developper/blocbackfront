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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientStatutService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const patient_entity_1 = require("../entities/patient.entity");
let PatientStatutService = class PatientStatutService {
    patientRepo;
    constructor(patientRepo) {
        this.patientRepo = patientRepo;
    }
    async changerStatut(patientId, nouveauStatut) {
        const patient = await this.patientRepo.findOne({ where: { id: patientId } });
        if (!patient)
            throw new Error('Patient non trouvé');
        const transitionsValides = {
            [patient_entity_1.PatientStatut.EN_ATTENTE_CPA]: [patient_entity_1.PatientStatut.CPA_REALISE],
            [patient_entity_1.PatientStatut.CPA_REALISE]: [patient_entity_1.PatientStatut.EN_ATTENTE_VPA],
            [patient_entity_1.PatientStatut.EN_ATTENTE_VPA]: [patient_entity_1.PatientStatut.VPA_REALISE],
            [patient_entity_1.PatientStatut.VPA_REALISE]: [patient_entity_1.PatientStatut.PRET_POUR_BLOC],
            [patient_entity_1.PatientStatut.PRET_POUR_BLOC]: [patient_entity_1.PatientStatut.EN_COURS_OPERATION],
            [patient_entity_1.PatientStatut.EN_COURS_OPERATION]: [patient_entity_1.PatientStatut.EN_SALLE_REVEIL],
            [patient_entity_1.PatientStatut.EN_SALLE_REVEIL]: [patient_entity_1.PatientStatut.SORTI],
            [patient_entity_1.PatientStatut.SORTI]: [],
        };
        const autorise = transitionsValides[patient.statut]?.includes(nouveauStatut);
        if (!autorise)
            throw new Error(`Transition invalide : ${patient.statut} → ${nouveauStatut}`);
        patient.statut = nouveauStatut;
        return this.patientRepo.save(patient);
    }
};
exports.PatientStatutService = PatientStatutService;
exports.PatientStatutService = PatientStatutService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(patient_entity_1.Patient)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PatientStatutService);
//# sourceMappingURL=patient-statut.service.js.map