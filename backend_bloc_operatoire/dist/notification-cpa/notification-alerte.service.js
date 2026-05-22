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
exports.NotificationAlerteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_cpa_entity_1 = require("../entities/notification-cpa.entity");
const patient_entity_1 = require("../entities/patient.entity");
const creneau_bloc_entity_1 = require("../entities/creneau-bloc.entity");
let NotificationAlerteService = class NotificationAlerteService {
    notifRepo;
    patientRepo;
    creneauRepo;
    constructor(notifRepo, patientRepo, creneauRepo) {
        this.notifRepo = notifRepo;
        this.patientRepo = patientRepo;
        this.creneauRepo = creneauRepo;
    }
    async getAlertesUrgentes() {
        const patientsUrgents = await this.patientRepo.find({ where: { niveauUrgence: patient_entity_1.NiveauUrgence.URGENT } });
        const alertes = [];
        for (const patient of patientsUrgents) {
            const creneau = await this.creneauRepo.findOne({ where: { patientId: patient.id, statut: creneau_bloc_entity_1.StatutCreneau.PLANIFIE } });
            if (!creneau) {
                alertes.push({ type: 'URGENCE_SANS_CRENEAU', patient, message: `Patient urgent sans créneau : ${patient.nom} ${patient.prenom}` });
            }
        }
        const dateLimite = new Date();
        dateLimite.setHours(dateLimite.getHours() - 48);
        const notifsEnRetard = await this.notifRepo.find({ where: { statut: notification_cpa_entity_1.StatutNotificationCPA.EN_ATTENTE, createdAt: (0, typeorm_2.LessThanOrEqual)(dateLimite) }, relations: ['patient', 'chirurgien'] });
        for (const notif of notifsEnRetard) {
            alertes.push({ type: 'NOTIFICATION_RETARD', notification: notif, message: `Notification CPA en attente depuis +48h pour ${notif.patient.nom} ${notif.patient.prenom}` });
        }
        return { total: alertes.length, alertes };
    }
    async getResumeJour() {
        const aujourdhui = new Date().toISOString().split('T')[0];
        const [creneauxJour, urgences, notifsEnAttente] = await Promise.all([
            this.creneauRepo.find({ where: { date: new Date(aujourdhui) }, relations: ['patient', 'chirurgien'] }),
            this.patientRepo.count({ where: { niveauUrgence: patient_entity_1.NiveauUrgence.URGENT } }),
            this.notifRepo.count({ where: { statut: notification_cpa_entity_1.StatutNotificationCPA.EN_ATTENTE } }),
        ]);
        return {
            date: aujourdhui,
            nombreCreneaux: creneauxJour.length,
            nombreUrgences: urgences,
            notificationsEnAttente: notifsEnAttente,
            creneaux: creneauxJour,
        };
    }
};
exports.NotificationAlerteService = NotificationAlerteService;
exports.NotificationAlerteService = NotificationAlerteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_cpa_entity_1.NotificationCPA)),
    __param(1, (0, typeorm_1.InjectRepository)(patient_entity_1.Patient)),
    __param(2, (0, typeorm_1.InjectRepository)(creneau_bloc_entity_1.CreneauBloc)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], NotificationAlerteService);
//# sourceMappingURL=notification-alerte.service.js.map