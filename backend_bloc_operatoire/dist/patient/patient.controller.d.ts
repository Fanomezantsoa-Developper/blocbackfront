import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
export declare class PatientController {
    private readonly patientService;
    constructor(patientService: PatientService);
    create(createPatientDto: CreatePatientDto): Promise<import("../entities").Patient>;
    findAll(statut?: string, niveauUrgence?: string, recherche?: string, page?: number, limite?: number): Promise<{
        data: import("../entities").Patient[];
        total: number;
        page: number;
        pages: number;
    }>;
    findOne(id: string): Promise<import("../entities").Patient>;
    update(id: string, updatePatientDto: UpdatePatientDto): Promise<import("../entities").Patient>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
