import { Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';
import { ActivitePerOp } from '../entities/activite-per-op.entity';
import { ScoreSCCRE } from '../entities/score-sccre.entity';
import { Medecin } from '../entities/medecin.entity';
import { CPA } from '../entities/cpa.entity';
import { NotificationCPA } from '../entities/notification-cpa.entity';
export declare class RapportsService {
    private patientRepo;
    private activiteRepo;
    private scoreRepo;
    private medecinRepo;
    private cpaRepository;
    private notifRepo;
    constructor(patientRepo: Repository<Patient>, activiteRepo: Repository<ActivitePerOp>, scoreRepo: Repository<ScoreSCCRE>, medecinRepo: Repository<Medecin>, cpaRepository: Repository<CPA>, notifRepo: Repository<NotificationCPA>);
    statistiquesGenerales(dateDebut?: string, dateFin?: string): Promise<{
        totalPatients: number;
        totalOperations: number;
        totalUrgences: number;
        totalScores: number;
        totalMedecins: number;
        patientsParStatut: any[];
        urgencesParNiveau: any[];
    }>;
    activiteParChirurgien(dateDebut?: string, dateFin?: string): Promise<any[]>;
    cpaEnAttente(): Promise<NotificationCPA[]>;
    tauxOccupation(periode?: string): Promise<any[]>;
    exportStatistiques(type: string, dateDebut?: string, dateFin?: string): Promise<{
        type: string;
        genereLe: string;
        statistiques: {
            totalPatients: number;
            totalOperations: number;
            totalUrgences: number;
            totalScores: number;
            totalMedecins: number;
            patientsParStatut: any[];
            urgencesParNiveau: any[];
        };
        activiteParChirurgien: any[];
    }>;
}
