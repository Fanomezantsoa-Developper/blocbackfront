import { BonCommandeService } from './bon-commande.service';
import { CreateBonCommandeDto } from './dto/create-bon-commande.dto';
import { UpdateBonCommandeDto } from './dto/update-bon-commande.dto';
export declare class BonCommandeController {
    private readonly service;
    constructor(service: BonCommandeService);
    create(dto: CreateBonCommandeDto): Promise<import("../entities").BonCommandeAnesthesie>;
    findAll(p?: number, l?: number): Promise<{
        data: import("../entities").BonCommandeAnesthesie[];
        total: number;
        page: number;
        pages: number;
    }>;
    findOne(id: string): Promise<import("../entities").BonCommandeAnesthesie>;
    update(id: string, dto: UpdateBonCommandeDto): Promise<import("../entities").BonCommandeAnesthesie>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
