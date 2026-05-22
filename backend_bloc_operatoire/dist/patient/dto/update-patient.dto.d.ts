import { CreatePatientDto } from './create-patient.dto';
import { PatientStatut, NiveauUrgence } from '../../entities/patient.entity';
declare const UpdatePatientDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePatientDto>>;
export declare class UpdatePatientDto extends UpdatePatientDto_base {
    statut?: PatientStatut;
    niveauUrgence?: NiveauUrgence;
    chambre?: string;
}
export {};
