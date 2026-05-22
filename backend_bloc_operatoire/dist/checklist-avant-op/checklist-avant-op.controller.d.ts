import { Repository } from 'typeorm';
import { ChecklistAvantOp } from '../entities/checklist-avant-op.entity';
export declare class ChecklistAvantOpController {
    private repo;
    constructor(repo: Repository<ChecklistAvantOp>);
    create(dto: any): Promise<ChecklistAvantOp[]>;
    findAll(patientId?: string): Promise<ChecklistAvantOp[]>;
    findOne(id: string): Promise<ChecklistAvantOp | null>;
    update(id: string, dto: any): Promise<import("typeorm").UpdateResult>;
}
