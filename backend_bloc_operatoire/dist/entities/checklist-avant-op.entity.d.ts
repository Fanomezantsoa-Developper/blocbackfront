import { Patient } from './patient.entity';
export declare enum StatutChecklist {
    EN_COURS = "EN_COURS",
    VALIDE = "VALIDE"
}
export declare class ChecklistAvantOp {
    id: string;
    patient: Patient;
    patientId: string;
    dateCreation: Date;
    identiteConfirmee: boolean;
    interventionSiteConfirmes: boolean;
    documentationDisponible: boolean;
    installationConnue: boolean;
    materielChirurgicalVerifie: boolean;
    materielAnesthesiqueVerifie: boolean;
    allergiePatient: boolean;
    risqueIntubation: boolean;
    risqueSaignement: boolean;
    medicamentsRemplis: boolean;
    statut: StatutChecklist;
    createdAt: Date;
    updatedAt: Date;
}
