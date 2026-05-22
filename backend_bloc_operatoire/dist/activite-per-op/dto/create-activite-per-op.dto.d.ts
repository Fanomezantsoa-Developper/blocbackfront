declare class ConstanteDto {
    heure: string;
    fc?: number;
    ta?: string;
    spo2?: number;
    temperature?: number;
    capnie?: number;
    score?: number;
}
export declare class CreateActivitePerOpDto {
    patientId: string;
    chirurgienId: string;
    anesthesisteId: string;
    dateOperation: string;
    perfusions?: string;
    transfusions?: string;
    journalSorties?: string;
    constantes?: ConstanteDto[];
    intubationOT: boolean;
    sArme: boolean;
    masqueLarynge: boolean;
    ventilation?: any;
    etatArrivee?: string[];
}
export {};
