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
exports.NotificationCPAService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_cpa_entity_1 = require("../entities/notification-cpa.entity");
let NotificationCPAService = class NotificationCPAService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const saved = await this.repo.save(this.repo.create(dto));
        return Array.isArray(saved) ? saved[0] : saved;
    }
    async findAll(page = 1, limite = 10) {
        const [data, total] = await this.repo.findAndCount({
            relations: ['patient', 'chirurgien'],
            skip: (page - 1) * limite,
            take: limite,
            order: { createdAt: 'DESC' },
        });
        return { data, total, page, pages: Math.ceil(total / limite) };
    }
    async findOne(id) {
        const n = await this.repo.findOne({ where: { id }, relations: ['patient', 'chirurgien'] });
        if (!n)
            throw new common_1.NotFoundException(`Notification ${id} non trouvée`);
        return n;
    }
    async planifierRDV(id, dto) {
        const n = await this.findOne(id);
        n.statut = notification_cpa_entity_1.StatutNotificationCPA.RDV_PLANIFIE;
        n.heurePrescription = dto.heureRDV || n.heurePrescription;
        return this.repo.save(n);
    }
    async update(id, dto) {
        const n = await this.findOne(id);
        return this.repo.save(Object.assign(n, dto));
    }
    async remove(id) {
        await this.findOne(id);
        await this.repo.delete(id);
        return { message: 'Notification supprimée' };
    }
};
exports.NotificationCPAService = NotificationCPAService;
exports.NotificationCPAService = NotificationCPAService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_cpa_entity_1.NotificationCPA)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotificationCPAService);
//# sourceMappingURL=notification-cpa.service.js.map