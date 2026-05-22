import { Repository } from 'typeorm';
import { CPA } from '../entities/cpa.entity';
import { Patient } from '../entities/patient.entity';
import { Premedicament } from '../entities/premedicament.entity';
import { CreateCPADto } from './dto/create-cpa.dto';
import { UpdateCPADto } from './dto/update-cpa.dto';
export declare class CPAService {
    private cpaRepository;
    private patientRepo;
    private premedRepository;
    constructor(cpaRepository: Repository<CPA>, patientRepo: Repository<Patient>, premedRepository: Repository<Premedicament>);
    create(dto: CreateCPADto): Promise<CPA>;
    findAll(page?: number, limite?: number): Promise<{
        data: CPA[];
        total: number;
        page: number;
        pages: number;
    }>;
    findOne(id: string): Promise<CPA>;
    update(id: string, dto: UpdateCPADto): Promise<CPA>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
