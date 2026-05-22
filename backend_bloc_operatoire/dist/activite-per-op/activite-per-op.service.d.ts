import { Repository } from 'typeorm';
import { ActivitePerOp } from '../entities/activite-per-op.entity';
import { ConstantePerOp } from '../entities/constante-per-op.entity';
import { CreateActivitePerOpDto } from './dto/create-activite-per-op.dto';
import { UpdateActivitePerOpDto } from './dto/update-activite-per-op.dto';
export declare class ActivitePerOpService {
    private repo;
    private constanteRepo;
    constructor(repo: Repository<ActivitePerOp>, constanteRepo: Repository<ConstantePerOp>);
    create(dto: CreateActivitePerOpDto): Promise<ActivitePerOp>;
    findAll(page?: number, limite?: number): Promise<{
        data: ActivitePerOp[];
        total: number;
        page: number;
        pages: number;
    }>;
    findOne(id: string): Promise<ActivitePerOp>;
    update(id: string, dto: UpdateActivitePerOpDto): Promise<ActivitePerOp>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
