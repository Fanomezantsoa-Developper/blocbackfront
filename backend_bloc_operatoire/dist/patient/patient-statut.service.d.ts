import { Repository } from 'typeorm';
import { Patient, PatientStatut } from '../entities/patient.entity';
export declare class PatientStatutService {
    private patientRepo;
    constructor(patientRepo: Repository<Patient>);
    changerStatut(patientId: string, nouveauStatut: PatientStatut): Promise<Patient>;
}
