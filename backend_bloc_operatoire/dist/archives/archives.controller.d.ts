import { ArchivesService } from './archives.service';
export declare class ArchivesController {
    private readonly archivesService;
    constructor(archivesService: ArchivesService);
    getDossierComplet(patientId: string): Promise<any>;
    getResumePatient(patientId: string): Promise<any>;
}
