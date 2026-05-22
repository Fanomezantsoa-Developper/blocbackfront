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
exports.CPAService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cpa_entity_1 = require("../entities/cpa.entity");
const patient_entity_1 = require("../entities/patient.entity");
const premedicament_entity_1 = require("../entities/premedicament.entity");
let CPAService = class CPAService {
    cpaRepository;
    patientRepo;
    premedRepository;
    constructor(cpaRepository, patientRepo, premedRepository) {
        this.cpaRepository = cpaRepository;
        this.patientRepo = patientRepo;
        this.premedRepository = premedRepository;
    }
    async create(dto) {
        const { premedicaments, ...cpaData } = dto;
        const cpa = this.cpaRepository.create(cpaData);
        const savedCPA = await this.cpaRepository.save(cpa);
        const saved = Array.isArray(savedCPA) ? savedCPA[0] : savedCPA;
        if (premedicaments?.length) {
            const premeds = premedicaments.map((p) => this.premedRepository.create({ ...p, cpa: saved }));
            await this.premedRepository.save(premeds);
        }
        if (dto.patientId) {
            await this.patientRepo.update(dto.patientId, { statut: patient_entity_1.PatientStatut.CPA_REALISE });
        }
        return this.findOne(saved.id);
    }
    async findAll(page = 1, limite = 10) {
        const [data, total] = await this.cpaRepository.findAndCount({
            relations: ['patient', 'anesthesiste', 'premedicaments'],
            skip: (page - 1) * limite, take: limite, order: { createdAt: 'DESC' }
        });
        return { data, total, page, pages: Math.ceil(total / limite) };
    }
    async findOne(id) {
        const cpa = await this.cpaRepository.findOne({ where: { id }, relations: ['patient', 'anesthesiste', 'premedicaments'] });
        if (!cpa)
            throw new common_1.NotFoundException(`CPA ${id} non trouvée`);
        return cpa;
    }
    async update(id, dto) {
        const cpa = await this.findOne(id);
        Object.assign(cpa, dto);
        return this.cpaRepository.save(cpa);
    }
    async remove(id) {
        await this.findOne(id);
        await this.cpaRepository.delete(id);
        return { message: 'CPA supprimée' };
    }
};
exports.CPAService = CPAService;
exports.CPAService = CPAService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cpa_entity_1.CPA)),
    __param(1, (0, typeorm_1.InjectRepository)(patient_entity_1.Patient)),
    __param(2, (0, typeorm_1.InjectRepository)(premedicament_entity_1.Premedicament)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CPAService);
//# sourceMappingURL=cpa.service.js.map