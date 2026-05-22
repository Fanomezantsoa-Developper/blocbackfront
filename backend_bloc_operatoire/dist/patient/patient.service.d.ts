import { Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
export declare class PatientService {
    private patientRepository;
    constructor(patientRepository: Repository<Patient>);
    create(createPatientDto: CreatePatientDto): Promise<Patient>;
    findAll(filters?: {
        statut?: string;
        niveauUrgence?: string;
        recherche?: string;
        page?: number;
        limite?: number;
    }): Promise<{
        data: Patient[];
        total: number;
        page: number;
        pages: number;
    }>;
    findOne(id: string): Promise<Patient>;
    update(id: string, updatePatientDto: UpdatePatientDto): Promise<Patient>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
