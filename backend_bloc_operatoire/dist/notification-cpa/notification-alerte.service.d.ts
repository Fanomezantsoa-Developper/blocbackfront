import { Repository } from 'typeorm';
import { NotificationCPA } from '../entities/notification-cpa.entity';
import { Patient } from '../entities/patient.entity';
import { CreneauBloc } from '../entities/creneau-bloc.entity';
export declare class NotificationAlerteService {
    private notifRepo;
    private patientRepo;
    private creneauRepo;
    constructor(notifRepo: Repository<NotificationCPA>, patientRepo: Repository<Patient>, creneauRepo: Repository<CreneauBloc>);
    getAlertesUrgentes(): Promise<any>;
    getResumeJour(): Promise<any>;
}
