import { Patient } from './patient.entity';
export declare enum StatutChecklist {
    EN_COURS = "EN_COURS",
    VALIDE = "VALIDE"
}
export declare class ChecklistApresOp {
    id: string;
    patient: Patient;
    patientId: string;
    dateCreation: Date;
    interventionEnregistree: boolean;
    compteFinalCorrect: boolean;
    etiquetageVerifie: boolean;
    signalementsEffectues: boolean;
    transfertSalleReveil: boolean;
    observationsParticulieres: string;
    statut: StatutChecklist;
    createdAt: Date;
    updatedAt: Date;
}
