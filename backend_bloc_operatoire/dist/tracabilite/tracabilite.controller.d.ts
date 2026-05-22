import { TracabiliteService } from './tracabilite.service';
export declare class TracabiliteController {
    private readonly service;
    constructor(service: TracabiliteService);
    getHistorique(entite: string, entiteId: string): Promise<import("../entities").HistoriqueModification[]>;
    getTous(page?: number, limite?: number): Promise<{
        data: import("../entities").HistoriqueModification[];
        total: number;
        page: number;
        pages: number;
    }>;
}
