import { Repository } from 'typeorm';
import { CreneauBloc, TypeRDV } from '../entities/creneau-bloc.entity';
import { Patient } from '../entities/patient.entity';
export declare class PlanningService {
    private creneauRepo;
    private patientRepo;
    constructor(creneauRepo: Repository<CreneauBloc>, patientRepo: Repository<Patient>);
    getPlanningJour(jour: string, type?: TypeRDV): Promise<CreneauBloc[]>;
    getPlanningSemaine(debut: string, fin: string, type?: TypeRDV): Promise<CreneauBloc[]>;
    reserverCreneau(dto: any): Promise<CreneauBloc[]>;
    annulerCreneau(id: string): Promise<CreneauBloc>;
    getUrgencesEnAttente(): Promise<CreneauBloc[]>;
    transfererCpaVersVpa(dto: {
        patientId: string;
        chirurgienId: string;
        dateVPA: string;
        heureDebut: string;
        salle: string;
    }): Promise<CreneauBloc>;
    transfererVpaVersPatientJour(dto: {
        patientId: string;
        chirurgienId: string;
        date: string;
        heureDebut: string;
        salle: string;
    }): Promise<CreneauBloc>;
}
