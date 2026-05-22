import { Repository } from 'typeorm';
import { BonCommandeAnesthesie } from '../entities/bon-commande-anesthesie.entity';
import { ItemCommande } from '../entities/item-commande.entity';
import { CreateBonCommandeDto } from './dto/create-bon-commande.dto';
import { UpdateBonCommandeDto } from './dto/update-bon-commande.dto';
export declare class BonCommandeService {
    private bonRepo;
    private itemRepo;
    constructor(bonRepo: Repository<BonCommandeAnesthesie>, itemRepo: Repository<ItemCommande>);
    create(dto: CreateBonCommandeDto): Promise<BonCommandeAnesthesie>;
    findAll(page?: number, limite?: number): Promise<{
        data: BonCommandeAnesthesie[];
        total: number;
        page: number;
        pages: number;
    }>;
    findOne(id: string): Promise<BonCommandeAnesthesie>;
    update(id: string, dto: UpdateBonCommandeDto): Promise<BonCommandeAnesthesie>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
