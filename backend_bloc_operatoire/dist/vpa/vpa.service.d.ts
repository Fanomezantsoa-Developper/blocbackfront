import { Repository } from 'typeorm';
import { VPA } from '../entities/vpa.entity';
import { Patient } from '../entities/patient.entity';
import { CreateVPADto } from './dto/create-vpa.dto';
import { UpdateVPADto } from './dto/update-vpa.dto';
export declare class VPAService {
    private repo;
    private patientRepo;
    constructor(repo: Repository<VPA>, patientRepo: Repository<Patient>);
    create(dto: CreateVPADto): Promise<VPA>;
    findAll(page?: number, limite?: number): Promise<{
        data: VPA[];
        total: number;
        page: number;
        pages: number;
    }>;
    findOne(id: string): Promise<VPA>;
    update(id: string, dto: UpdateVPADto): Promise<VPA>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
