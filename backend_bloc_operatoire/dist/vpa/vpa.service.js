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
exports.VPAService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vpa_entity_1 = require("../entities/vpa.entity");
const patient_entity_1 = require("../entities/patient.entity");
let VPAService = class VPAService {
    repo;
    patientRepo;
    constructor(repo, patientRepo) {
        this.repo = repo;
        this.patientRepo = patientRepo;
    }
    async create(dto) {
        const saved = await this.repo.save(this.repo.create(dto));
        if (dto.patientId) {
            await this.patientRepo.update(dto.patientId, { statut: patient_entity_1.PatientStatut.VPA_REALISE });
        }
        return Array.isArray(saved) ? saved[0] : saved;
    }
    async findAll(page = 1, limite = 10) {
        const [data, total] = await this.repo.findAndCount({
            relations: ['patient', 'cpa', 'anesthesiste'],
            skip: (page - 1) * limite, take: limite, order: { createdAt: 'DESC' }
        });
        return { data, total, page, pages: Math.ceil(total / limite) };
    }
    async findOne(id) {
        const vpa = await this.repo.findOne({ where: { id }, relations: ['patient', 'cpa', 'anesthesiste'] });
        if (!vpa)
            throw new common_1.NotFoundException(`VPA ${id} non trouvée`);
        return vpa;
    }
    async update(id, dto) {
        const vpa = await this.findOne(id);
        return this.repo.save(Object.assign(vpa, dto));
    }
    async remove(id) {
        await this.findOne(id);
        await this.repo.delete(id);
        return { message: 'VPA supprimée' };
    }
};
exports.VPAService = VPAService;
exports.VPAService = VPAService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vpa_entity_1.VPA)),
    __param(1, (0, typeorm_1.InjectRepository)(patient_entity_1.Patient)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], VPAService);
//# sourceMappingURL=vpa.service.js.map