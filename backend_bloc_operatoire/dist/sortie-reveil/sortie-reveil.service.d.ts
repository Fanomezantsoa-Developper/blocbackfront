import { Repository } from 'typeorm';
import { SortieReveil } from '../entities/sortie-reveil.entity';
import { CreateSortieReveilDto } from './dto/create-sortie-reveil.dto';
import { UpdateSortieReveilDto } from './dto/update-sortie-reveil.dto';
export declare class SortieReveilService {
    private repo;
    constructor(repo: Repository<SortieReveil>);
    create(dto: CreateSortieReveilDto): Promise<SortieReveil>;
    findAll(page?: number, limite?: number): Promise<{
        data: SortieReveil[];
        total: number;
        page: number;
        pages: number;
    }>;
    findOne(id: string): Promise<SortieReveil>;
    update(id: string, dto: UpdateSortieReveilDto): Promise<SortieReveil>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
