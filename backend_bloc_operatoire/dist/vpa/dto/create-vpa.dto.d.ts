import { StatutVPA } from '../../entities/vpa.entity';
export declare class CreateVPADto {
    patientId?: string;
    cpaId?: string;
    anesthesisteId?: string;
    dateVisite: string;
    identiteConfirmee: boolean;
    jeuneRespected: boolean;
    instructionsRespectees: boolean;
    premedicationFaite: boolean;
    jeune: string;
    examensComplementaires: string;
    commandeSang?: any;
    heureDepart: string;
    statut?: StatutVPA;
}
