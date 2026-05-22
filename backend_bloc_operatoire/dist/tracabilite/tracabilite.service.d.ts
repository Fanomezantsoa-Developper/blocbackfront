import { Repository } from 'typeorm';
import { HistoriqueModification } from '../entities/historique-modification.entity';
export declare class TracabiliteService {
    private repo;
    constructor(repo: Repository<HistoriqueModification>);
    log(entite: string, entiteId: string, action: string, details?: any, utilisateurId?: string): Promise<HistoriqueModification>;
    getHistorique(entite: string, entiteId: string): Promise<HistoriqueModification[]>;
    getTousHistoriques(page?: number, limite?: number): Promise<{
        data: HistoriqueModification[];
        total: number;
        page: number;
        pages: number;
    }>;
}
