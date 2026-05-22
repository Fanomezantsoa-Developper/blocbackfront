import { Repository } from 'typeorm';
import { ScoreSCCRE } from '../entities/score-sccre.entity';
import { CreateScoreSCCREDto } from './dto/create-score-sccre.dto';
import { UpdateScoreSCCREDto } from './dto/update-score-sccre.dto';
export declare class ScoreSCCREService {
    private repo;
    constructor(repo: Repository<ScoreSCCRE>);
    create(dto: CreateScoreSCCREDto): Promise<ScoreSCCRE>;
    findAll(page?: number, limite?: number): Promise<{
        data: ScoreSCCRE[];
        total: number;
        page: number;
        pages: number;
    }>;
    findOne(id: string): Promise<ScoreSCCRE>;
    update(id: string, dto: UpdateScoreSCCREDto): Promise<ScoreSCCRE>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
