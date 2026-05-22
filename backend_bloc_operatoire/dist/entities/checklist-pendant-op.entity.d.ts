import { Patient } from './patient.entity';
export declare enum StatutChecklist {
    EN_COURS = "EN_COURS",
    VALIDE = "VALIDE"
}
export declare class ChecklistPendantOp {
    id: string;
    patient: Patient;
    patientId: string;
    dateCreation: Date;
    identiteUltimeConfirmee: boolean;
    interventionConfirmee: boolean;
    siteOperatoireConfirme: boolean;
    installationCorrecte: boolean;
    documentsDisponibles: boolean;
    antibioprophylaxieFaite: boolean;
    constantesStables: boolean;
    ventilationOK: boolean;
    statut: StatutChecklist;
    createdAt: Date;
    updatedAt: Date;
}
